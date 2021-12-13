const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
        {   //red graph
            label: 'ping to valorant',
            pointRadius: 0,
            backgroundColor: [
                'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.8)'
            ],
            borderWidth: 1
        },{ //green graph
            label: 'ping to cloudflare',
            pointRadius: 0,
            backgroundColor: [               
                'rgba(99, 255, 132, 0.0)'
            ],
            borderColor: [
                'rgba(99, 255, 132, 0.8)'
            ],
            borderWidth: 1
        },{//blue graph
            label: 'ping to google',
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

function initialize_graph(){
    myChart.data.labels = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    myChart.data.datasets.forEach(set => {
        for(let i = 0; i < 20; i++) set.data.push(50)        
    });
}

window.addEventListener("keydown", function(event){
    if(event.key == "r"){
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)';
    }
    else if(event.key == "g"){
        myChart.data.datasets[1].backgroundColor = 'rgba(99, 255, 132, 0.2)';
    }
    else if(event.key == "b"){
        myChart.data.datasets[2].backgroundColor = 'rgba(130, 160, 255, 0.2)';
    }
    else if(event.key == "n"){
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.0)';
        myChart.data.datasets[1].backgroundColor = 'rgba(99, 255, 132, 0.0)';
        myChart.data.datasets[2].backgroundColor = 'rgba(130, 160, 255, 0.0)';
    }
    else if(event.key == "a"){
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)';
        myChart.data.datasets[1].backgroundColor = 'rgba(99, 255, 132, 0.2)';
        myChart.data.datasets[2].backgroundColor = 'rgba(130, 160, 255, 0.2)';
    }
}, true);

function update_graph(graph){
    graph.data.datasets.forEach(set => {
        set.data.push(rnd(100));
        set.data.shift();
    }); 
    graph.update();
}

initialize_graph();
var invoke = window.setInterval(function(){update_graph(myChart);},500);