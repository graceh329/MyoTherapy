(function() {
	Myo.plugins = Myo.plugins || {};

	/*Myo.plugins.flex = {
		threshold     : 0.25, //What flex strength we considered to be 'flexed'
		timeout       : 150, //Milliseconds after flexing that we send the event
		emgResolution : 10   //How many EMG datasets we use to smooth the data
	};*/

	Myo.on('connected', function() {
		this.streamEMG(true);
	});

	//Emits a useful number between 0 and 1 that represents how flexed the arm is
	var emgHistory = Array.apply(null, Array(Myo.plugins.flex.emgResolution)).map(function() {
		return [0, 0, 0, 0, 0, 0, 0, 0]
	});
	var pinchTotal = 0;
	var numPinch = 0;
	var d = new Date();
	var startTime = d.getTime();
	var calculate = true;
	var bar = new ProgressBar.Line(container1, {
		strokeWidth: 10,
		duration: 6000,
		//  easing: 'easeInOut',
		color: '#58bcdd',
		trailColor: '#eee',
		trailWidth: 8,
		svgStyle: {
			width: '100%',
			height: '100%'
		}
	});
	var num = 2;
	var x = setInterval(function() {
		document.getElementById('flipCap').innerHTML=num;
		if(num==0){
			clearInterval(x);
			document.getElementById('flipCap').innerHTML="";
		}num=num-1;
	}, 1000);
	var down = false;
	Myo.on('emg', function(pods) {
		d = new Date();
		var timeSinceBegin = (d.getTime() - startTime) / 1000;
		emgHistory = emgHistory.slice(1);
		emgHistory.push(pods);

		//Find the max values for each pod over the recorded history
		var maxPodValues = emgHistory.reduce(function(r, data) {
			return data.map(function(podData, index) {
				podData = Math.abs(podData);
				return (podData > r[index]) ? podData : r[index]
			});
		}, [0, 0, 0, 0, 0, 0, 0, 0]);
		if (timeSinceBegin >= 3 && timeSinceBegin <= 18) {
			if (timeSinceBegin % 6 >= 3) {
				var pinch = 0;
				if (this.arm == "left") {
					pinch = 0.7 * maxPodValues[2] + 0.2 * maxPodValues[1] + 0.1 * maxPodValues[3];
				} else {
					pinch = 0.7 * maxPodValues[4] + 0.2 * maxPodValues[3] + 0.1 * maxPodValues[5];
				}
				pinchTotal += pinch;
				//console.log(this.arm, maxPodValues[2], maxPodValues[1], maxPodValues[3]);
				numPinch += 1;
			}
			var prevBar = bar.value();
			var newBar = (timeSinceBegin - 3) % 3 / 3;
			bar.set(newBar);
			if (newBar+0.1 < prevBar) {
				console.log(newBar, prevBar);
				if(down){
					document.getElementById("gifimg").src = "images/pinch-short-1-fast.gif";
					down = false;
				}
				else{
					document.getElementById("gifimg").src = "images/pinch-short-2-fast.gif";
					down = true;
				}
			}
		}
		if (timeSinceBegin > 18 && calculate) {
			calculate = false;
			var avgPinch = pinchTotal / numPinch;
			console.log(pinchTotal);
			console.log(numPinch);
			console.log(avgPinch);
			var currdate = new Date();
			var myJSON = {
				"month": currdate.getMonth(),
				"day": currdate.getDay(),
				"year": currdate.getYear(),
				"hour": currdate.getHours(),
				"minute": currdate.getMinutes(),
				"final": Math.min(avgPinch/36, 1)
			}
			var JSONstring = JSON.stringify(myJSON);
			console.log(JSONstring);
			window.location = "pinchFinal.html?json=" + JSONstring;
		}
		//Find the average and then convert to between 0 and 1
		var podAvg = maxPodValues.reduce(function(r, d) {
			return r + d;
		}, 0) / (8 * 128);
		//console.log(maxPodValues);
		//console.log(podAvg);
		this.trigger('flex_strength', podAvg);
	});
	//console.log(Myo.arm);
	//Sets a boolean and emits events when the arm becomes flexed. Uses a timeout to smooth the data a bit
	var flexTimer;
	Myo.on('flex_strength', function(val) {
		var myo = this;
		if (val > Myo.plugins.flex.threshold && !myo.isArmFlexed) {
			myo.isArmFlexed = true;
			myo.trigger('arm_flex');
			clearTimeout(flexTimer);
			flexTimer = null;
		} else if (val < Myo.plugins.flex.threshold && myo.isArmFlexed && !flexTimer) {
			flexTimer = setTimeout(function() {
				myo.isArmFlexed = false;
				myo.trigger('arm_unflex');
				flexTimer = null;
			}, Myo.plugins.flex.timeout);
		}
	});
}());