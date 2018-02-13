var Myo = require('myo');
	
Myo.onError = function () {  
        console.log("Woah, couldn't connect to Myo Connect");
}

Myo.on('fist', function(){  
   console.log('Fist!');
   this.vibrate();
});

Myo.connect();