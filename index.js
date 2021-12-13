const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
        {   //red graph
            label: 'ping to cloudflare',
            pointRadius: 0,
            backgroundColor: [
                'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.8)'
            ],
            borderWidth: 1
        },{ //green graph
            label: 'ping to google',
            pointRadius: 0,
            backgroundColor: [               
                'rgba(99, 255, 132, 0.0)'
            ],
            borderColor: [
                'rgba(99, 255, 132, 0.8)'
            ],
            borderWidth: 1
        },{//blue graph
            label: 'ping to valorant',
            pointRadius: 0,
            backgroundColor: [               
                'rgba(130, 160, 255, 0.0)'
            ],
            borderColor: [
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
                    display: false
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

function rnd(num){
    return Math.floor(Math.random() * num + 1);
}

document.getElementById("myChart").addEventListener("click", clickChart);

let counter = 0;
function clickChart(){
    counter ++;
    if(counter == 1){
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)';
        myChart.data.datasets[1].backgroundColor = 'rgba(99, 255, 132, 0.0)';
        myChart.data.datasets[2].backgroundColor = 'rgba(130, 160, 255, 0.0)';
    }
    else if(counter == 2){
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.0)';
        myChart.data.datasets[1].backgroundColor = 'rgba(99, 255, 132, 0.2)';
        myChart.data.datasets[2].backgroundColor = 'rgba(130, 160, 255, 0.0)';
    }
    else if(counter == 3){
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.0)';
        myChart.data.datasets[1].backgroundColor = 'rgba(99, 255, 132, 0.0)';
        myChart.data.datasets[2].backgroundColor = 'rgba(130, 160, 255, 0.2)';
    }
    else if(counter == 4){
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.0)';
        myChart.data.datasets[1].backgroundColor = 'rgba(99, 255, 132, 0.0)';
        myChart.data.datasets[2].backgroundColor = 'rgba(130, 160, 255, 0.0)';
    }
    else{
        counter = 0;
        clickChart();
    }
}

function init(){
    myChart.data.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    myChart.data.datasets[1].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    myChart.data.datasets[2].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    myChart.data.labels = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}

function update_graph(graph){

    graph.data.datasets[0].data.push(rnd(100));
    graph.data.datasets[1].data.push(rnd(100));
    graph.data.datasets[2].data.push(rnd(100));

    graph.data.datasets[0].data.shift();
    graph.data.datasets[1].data.shift();
    graph.data.datasets[2].data.shift();
 
    graph.update();
}

function interval(){
    update_graph(myChart);
}

init();
var intervalId = window.setInterval(function(){
    interval();
}, 500);


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