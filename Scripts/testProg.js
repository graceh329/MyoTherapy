TESTPROG = document.getElementById('testProg');

Plotly.plot( TESTPROG, [{
    x: [1, 2, 3, 4, 5, 9],
    y: [1, 2, 4, 8, 16, 25] }], { 
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