(function() {
	Myo.plugins = Myo.plugins || {};
	
	//if(!Myo.plugins.flex) throw 'flip.myo.js requires flex.myo.js';
	/*var snapHistory = fillArray(20, {x:0,y:0,z:0});*/
	var count = 0;
	var d = new Date();
	var startTime = d.getTime();
	var rollUp = [0, 0, 0];
	var rollUpCount = [0, 0, 0];
	var rollDown = [0, 0, 0];
	var rollDownCount = [0, 0, 0];
	var calculate = true;
	//console.log(startTime);
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
	//var modal = document.getElementById('count');
	//modal.style.display='block';
	var num = 2;
	var x = setInterval(function() {
		document.getElementById('flipCap').innerHTML=num;
		if(num==0){
			clearInterval(x);
			document.getElementById('flipCap').innerHTML="";
		}num=num-1;
	}, 1000);
	
	

	var down=false;
	Myo.on('orientation', function(data) {
		//count += 1;
		d = new Date();
		var timeSinceBegin = (d.getTime() - startTime) / 1000;
		
		//var dist = Math.abs(data.x-data.y);
		//console.log(timeSinceBegin);
		var roll = 0;
		if (timeSinceBegin >= 3 && timeSinceBegin <= 21) {
			var prevBar = bar.value();
			var newBar = ((timeSinceBegin-3)%3)/3;
			bar.set(newBar);
			if(newBar+0.1 < prevBar){
					//console.log('a');
					if(down){
						document.getElementById("flipImage").src="images/flip-short-2-fast.gif";
						down=false;
					}else{
				 		document.getElementById("flipImage").src="images/flip-short-1-fast.gif";
						down=true;
					}
			}
			roll = Math.atan2(2.0 * (data.w * data.x + data.y * data.z), 1.0 - 2.0 * (data.x * data.x + data.y * data.y));
			//console.log(roll);
			var index = Math.floor((timeSinceBegin-3) / 6);
			if (timeSinceBegin % 6 <= 3) {
				rollDown[index] += roll;
				rollDownCount[index] += 1;
			} else {
				rollUp[index] += roll;
				rollUpCount[index] += 1;
			}
		}
		//console.log(rollUpCount);
		var finalPercent = [0, 0, 0];
		if (timeSinceBegin > 21 && calculate) {
			calculate = false;
			for (var k = 0; k < 3; k++) {
				rollUp[k] /= rollUpCount[k];
				rollDown[k] /= rollDownCount[k];
				finalPercent[k] = Math.abs(rollUp[k]-rollDown[k])/0.8;
				if(finalPercent[k] > 1){
					 finalPercent[k] = 1;
				}
			}
			console.log(rollDown);
			console.log(rollUp);
			console.log(finalPercent);
			var currdate = new Date();
			var myJSON = {
				"month": currdate.getMonth(),
				"day": currdate.getDay(),
				"year": currdate.getYear(),
				"hour": currdate.getHours(),
				"minute": currdate.getMinutes(),
				"final": (finalPercent[0]+finalPercent[1]+finalPercent[2])/3
			}
			var JSONstring = JSON.stringify(myJSON);
			console.log(JSONstring);
			window.location = "flipFinal.html?json=" + JSONstring;
			/*var request;
			if(window.XMLHttpRequest){
				request =new XMLHttpRequest();
			}
			else{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			request.open("POST", "addFlipData.php", true);
			request.setRequestHeader("Content-type", "application/json");
			request.send("j="+JSONstring);
			request.onreadystatechage = function(){
			if(request.readyState === 4 && request.status === 200){
				console.log(request.responseText);
			}
			}*/
		}
		//if (count % 30 === 0) console.log(roll);

	});

}());