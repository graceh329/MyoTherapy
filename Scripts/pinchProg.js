PINCHPROG = document.getElementById('pinchProg');
if (typeof percent == 'undefined'){
  percent = 50;
}
Plotly.plot( PINCHPROG, [{
    x: [1, 2, 3, 5, 8, 9, 12],
    y: [20, 35, 46, 59, 47, 80, percent] }], { 
    margin: { t: 0 },
title: 'Plot Title',
  xaxis: {
    title: 'Hour Number',
    titlefont: {
      family: 'Helvetica',
      size: 18,
      color: '#7f7f7f'
    }
  },
  yaxis: {
    title: 'Strength',
    titlefont: {
      family: 'Helvetica',
      size: 18,
      color: '#7f7f7f'
    }
  }} );

/* Current Plotly.js version */
console.log( Plotly.BUILD );