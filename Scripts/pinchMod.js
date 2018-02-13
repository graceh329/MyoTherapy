// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
var bar = new ProgressBar.Line(container1, {
  strokeWidth: 10,
  //  easing: 'easeInOut',
  duration: 10000,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {
    width: '100%',
    height: '100%'
  }
});
var percentDone = 0.33;
//for(i=0; i < 3; i++){
  while (percentDone < 1) {
    if (percentDone == 0.99) {
      bar.animate(1);
    } else {
      bar.animate(percentDone);
    }
    percentDone = percentDone + 0.33;
  }
  //bar.set(0)
  //percentDone=0.33;
//}
/**
window.onload = function onLoad() {
  bar.animate(percent);
};
**/
// Number from 0.0 to 1.0