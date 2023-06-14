let su = [];
let elektrik = [];
let hayvan = [];
let diger = [];
let pie = [];
let street_names = [];
let street_names_best = [];
let pairs = [];
let pairs_best = [];

// Çizgi Grafiği
var ctx = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Su Şikayetleri',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            },
            {
                label: 'Elektrik  Şikayetleri',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            },
            {
                label: 'Hayvan  Şikayetleri',
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 2
            },
            {
                label: 'Diğer  Şikayetler',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }
        ]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    min: 1,
                    stepSize: 1
                }
            }
        }
    }
});


var ctx = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Su', 'Elektrik', 'Hayvan', 'Diğer'],
        datasets: [{
            data: [0,0,0,0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 3
        }]
    }
});

let isRunning = false; // Flag variable to track the execution status


async function orderData() {
    try {
        const [entries, pieEnt, worst, best] = await Promise.all([
            fetcher('line'),
            fetcher('pie'),
            fetcher('worst'),
            fetcher('best'),
        ]);
        const data = entries;
        data.forEach(entry => {
            const { entry_type, count, date } = entry;
            if (entry_type === 'Su') {
              su.push({ count, date });
            } else if (entry_type === 'Elektrik') {
              elektrik.push({ count, date });
            } else if (entry_type === 'Hayvan') {
              hayvan.push({ count, date });
            } else if (entry_type === 'Diger') {
              diger.push({ count, date });
            }
          });
        pieEnt.forEach(entry => {
            pie.push(entry.count);
        });
        worst.forEach(entry => {
          street_names.push(entry.street_name);
        })
        best.forEach(entry => {
            street_names_best.push(entry.street_name);
        })
      } catch (error) {
        console.error('Error adding advice:', error);
      }
      const promises = street_names.map(street => fetcher('worstAlt', street));
      const promisesBest = street_names_best.map(street => fetcher('bestAlt', street));
      await Promise.all(promises)
        .then(results => {
          pairs.push(results);
        })
        .catch(error => {
          console.error(error);
        });

        await Promise.all(promisesBest)
        .then(results => {
          pairs_best.push(results);
        })
        .catch(error => {
          console.error(error);
        });

        let i = 1;
        pairs[0].forEach(item => {
          let mainID = "main-name-"+i;
          document.getElementById(mainID).innerHTML = street_names[i-1];
          item.forEach(elmnt => {
            let id = "ac-"+i+"-content";  
            document.getElementById(id).innerHTML += elmnt.entry_type +": "+ elmnt.count + " | ";
          });
          i++
        });

        let y = 1;
        pairs_best[0].forEach(item => {
          let mainIDlow = "low-name-"+y;
          document.getElementById(mainIDlow).innerHTML = street_names_best[y-1];
          console.log(mainIDlow);
          item.forEach(elmnt => {
            let id = "low-"+y+"-content";  
            document.getElementById(id).innerHTML += elmnt.entry_type +": "+ elmnt.count + " | ";
          });
          y++
        });


        
}

function createList(mode, street, count, type) {
    const streets = document.createElement('li');
    const card = document.createElement('div');
    const card_col = document.createElement('div');
    const card_column = document.createElement('div');
    card.classList.add('card');
    streets.appendChild(card);
    if (mode === 'best') {
        card.innerHTML = type + street+': '+count;
        document.getElementById('iyi').appendChild(streets);
    }
    else if (mode === 'worst') {
        card.innerHTML = type + street+': '+count;
        document.getElementById('kötü').appendChild(streets);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

const fetcher = (type, streetName) => {
    var url = "";
    if (streetName == null) { url = "../php/fetch.php?type="+type; }
    else { url = "../php/fetch.php?type="+type+"&street_name="+streetName }
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(error);
        }
      });
    });
  };
  function getDaysInRange() {
    var currentDate = new Date();
    var endDateObj = new Date();
    endDateObj.setMonth(endDateObj.getMonth() - 1);
    var days = [];
  
    while (currentDate >= endDateObj) {
      var formattedDate = currentDate.toISOString().split('T')[0];
      days.push(formattedDate);
  
      currentDate.setDate(currentDate.getDate() - 1);
    }
  
    return days;
  }
  
  document.addEventListener('DOMContentLoaded', async function() {
    await orderData();
    su.forEach(entry => {
        lineChart.data.datasets[0].data.push(entry.count);
      });
    elektrik.forEach(entry => {
        lineChart.data.datasets[1].data.push(entry.count);
    });
    hayvan.forEach(entry => {
        lineChart.data.datasets[2].data.push(entry.count);
    });
    diger.forEach(entry => {
        lineChart.data.datasets[3].data.push(entry.count);
        lineChart.data.labels.push(entry.date);
    });
    var daysInRange = getDaysInRange();

    lineChart.update();
    pieChart.data.datasets[0].data = pie;
    pieChart.update();
});