// De visualisatie APi moet geladen worden om een grafiek te kunnen tekenen.
google.load('visualization', '1.0', { 'packages': ['corechart'] });
// Wanneer de 'Make API Call' button wordt aangeklikt wordt deze functie doorlopen
function makeApiCall() {
    queryCoreReportingApi();
}

function queryCoreReportingApi() {
    console.log('Querying Core Reporting API.');
    var today = new Date('2013-12-2');
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Januari is 0, daarom doen we getMonth()+1
    var aTimeAgo = today;
    var dd = today.getDate();
    aTimeAgo.setDate(dd - 10);
    var Dd = today.getDate();
    var Mm = aTimeAgo.getMonth() + 1; 
    var Yyyy = aTimeAgo.getFullYear();
    var yyyy = today.getFullYear();
    //Omzetten van de datum naar een gepast formaat.
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = yyyy + '-' + mm + '-' + dd;    
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } aTimeAgo = Yyyy + '-' + Mm + '-' + Dd;
    // De Analytics Service object wordt gebruikt om de Core Reporting APi naar een query om te zetten
    gapi.client.analytics.data.ga.get({
        'ids': 'YOUR VIEW ID',
        'start-date': aTimeAgo,
        'end-date': today,
        'dimensions' : 'ga:date',
        'sort' : 'ga:date',
        'metrics': 'ga:visits',
        'max-results' : 100
    }).execute(handleCoreReportingResults);
}


function handleCoreReportingResults(results) {
    if (results.error) {
        console.log('There was an error querying core reporting API: ' + results.message);

    } else {
        google.setOnLoadCallback(drawChart(results));
    }
}

function drawChart(result) {

    // Maak de datatable aan
    var data = new google.visualization.DataTable();
    data.addColumn('string', parseInt(result.columnHeaders[0].name));
    data.addColumn('number', 'Visits');
    for (var index = 0; index < result.rows.length; index++) {
        data.addRow([(result.rows[index][0]).substring(6, 8) + '-' + (result.rows[index][0]).substring(4, 6) + '-' + (result.rows[index][0]).substring(0, 4), parseInt(result.rows[index][1])]);
    }

     // Hier worden de grafiekopties beschreven
    var options = {
        'title': 'Page Traffic',
        'vAxis': {
            title: "#Visitors"
        },
        'width': 400,
        'height': 300,
        'hAxis': {
            title: "Date",
        }
    };

    // Instantieer de grafiek en toon hem op het scherm
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
