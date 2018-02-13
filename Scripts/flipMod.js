// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var bar = new ProgressBar.Line(container1, {
  strokeWidth: 10,
  duration: 6000,
  //  easing: 'easeInOut',
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {
    width: '100%',
    height: '100%'
  }
});

bar.animate(1, function(){bar.animate(0,{duration:1})});

bar.animate(1, function(){bar.animate(0,{duration:1})});





/**
window.onload = function onLoad() {
  bar.animate(percent);
};
**/
// Number from 0.0 to 1.0