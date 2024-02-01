
const date = new Date();
//https://documenter.getpostman.com/view/10724784/SzYXWz3x
var url = "https://covid-api.com/api/reports/total?date=date" + date;

fetch(url)
    .then(function(response){
        if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
    })
    .then(function(data) {
        // Log API status and retrieve PSI data
        console.log(data);
    })