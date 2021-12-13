const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'ping to cloudflare',
            pointRadius: 0,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(99, 255, 132, 0.2)',
                'rgba(130, 160, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(99, 255, 132, 0.8)',
                'rgba(130, 160, 255, 0.8)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(53,54,58,1)",
                },
                ticks: {
                    display: false //this will remove only the label
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(53,54,58,1)",
                }
            }],
            y: {
                beginAtZero: true
            }
        }
    }
});


let started = false;
function checkArray(item){
    if(item.length > 20)
    {
        item.shift();
        started = true;
    }
}

myChart.data.datasets[0].data = [0,0,0,0,0,2,2,10,2,2,0,0,0,5,5,5,5,5,5,5]
myChart.data.labels = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

function update_graph(graph){
    if(Math.random()*10 > 9.5){
        graph.data.datasets[0].data.push(Math.random()*10*5);
    }
    else{
        graph.data.datasets[0].data.push(Math.random()*10);
    }
    checkArray(graph.data.datasets[0].data)
    if(started == false) graph.data.labels.push(0);    
    graph.update();
}

function interval(){
    update_graph(myChart);
}

var intervalId = window.setInterval(function(){
    interval();
}, 1000);


const Latenz = require('latenz');
const l = new Latenz();

l.measure('google.com').then(result => {
  console.log(result);

  /*
    [
      { key: 'resolve', time: 139 },
      { key: 'socket', time: 2 },
      { key: 'response', time: 286 },
      { key: 'firstdata', time: 1 },
      { key: 'end', time: 2 }
    ]
  */
}).catch((e) => {
  throw e;
});