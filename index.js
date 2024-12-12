const ctx = document.getElementById('myChart');
async function getData() {
    const response = await fetch("NYPD_Shooting_Incident_Data__Historic__20241211.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    console.log(rows)
    return rows;
}
async function getGraph()
{
    let shootings = [0,0,0,0,0]
    let boroughs = ["QUEENS", "BROOKLYN", "MANHATTAN", "BRONX", "STATEN ISLAND"]
    const rows = await getData()
    rows.forEach((elem) => {
        const row = elem.split(",");
        let borough = row[3];
        let index = boroughs.indexOf(borough)
        shootings[index]++;
        console.log(borough)
    });
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: boroughs,
          datasets: [{
            label: 'Shooting Crimes Per Borough',
            data: shootings,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
}
getGraph()