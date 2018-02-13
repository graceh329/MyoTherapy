FLIPPROG = document.getElementById('flipProg');
if (typeof percent == 'undefined'){
  percent = 50;
}
Plotly.plot( FLIPPROG, [{
    x: [1, 2, 3, 5, 8, 9, 12],
    y: [92, 84, 77, 79, 67, 72, percent] }], { 
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
    title: '% Range of Motion',
    titlefont: {
      family: 'Helvetica',
      size: 18,
      color: '#7f7f7f'
    }
  }} );

/* Current Plotly.js version */
console.log( Plotly.BUILD );