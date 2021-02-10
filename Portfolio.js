$(document).ready(function () { 
    $('#myTable').DataTable();
    // FETCHING DATA FROM JSON FILE 
    $.getJSON("portfolioData.json",  function (data) { 
        
        //get table headings
        var thead;
        for (var headers in data[0]) {
            thead += "<th>" + headers + "</th>";
        }
        //thead+="</tr>";
        updateTableHeading(thead);

        var tbody;
        for (var item in data) {
            tbody += "<tr>";
            var dataObj = data[item];
            for (var val in dataObj){
                tbody += "<td>" + dataObj[val] + "</td>";
            }
            tbody += "</tr>";
        }
        //updateTableData(tbody);
        updateTableData(data);

    }); 


    function updateTableHeading(headings){
        console.log(headings);
        //$('#tableHeadings').append(headings); 
    }

    function updateTableData(data){
        //console.log(tbldata);
        //$('#tableData').append(tbldata); 
        $("#myTable").DataTable().clear();
        var length = Object.keys(data.portfolio).length;
        for(var i = 1; i < length+1; i++) {
        var customer = data.portfolio['asset'+i];

        // You could also use an ajax property on the data table initialization
        $('#myTable').dataTable().fnAddData( [
            customer.asset_name,
            customer.asset_type,
            customer.date_purchased,
            "€" + customer.price_paid,
            "€" + customer.price_now,
            customer.profit
        ]);
    }
    }

    //$('#myTable').DataTable();

    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        
        // Add data
        chart.data = [{
          "stock": "Moderna",
          "profit": 24.7
        }, {
          "stock": "Amazon",
          "profit": 7.9
        }, {
          "stock": "Apple",
          "profit": 3.2
        }, {
          "stock": "Tesla",
          "profit": 3.2
        }, {
          "stock": "Ford",
          "profit": 2.5
        }];
        
        // Create axes
        
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "stock";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        
        categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
          if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
          }
          return dy;
        });
        
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "profit";
        series.dataFields.categoryX = "stock";
        series.name = "Profit";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        
        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        
        }); // end am4core.ready()

        //chart 2
        am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create("chartdiv2", am4charts.XYChart);
            
            // Add data
            chart.data = [
              {date:new Date(2021,1,06), value1:121.76, value2:108.32, previousDate:new Date(2020, 1, 06)},
              {date:new Date(2021,1,10), value1:121.54, value2:122.44, previousDate:new Date(2020, 1, 10)},
              {date:new Date(2021,1,14), value1:122.31, value2:125.94, previousDate:new Date(2020, 1, 14)},
              {date:new Date(2021,1,18), value1:133.77, value2:119.81, previousDate:new Date(2020, 1, 18)},
              {date:new Date(2021,1,22), value1:140.32, value2:120.21, previousDate:new Date(2020, 1,22)}
            ]
            
            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.minGridDistance = 50;
            
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            
            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value1";
            series.dataFields.dateX = "date";
            series.strokeWidth = 2;
            series.minBulletDistance = 10;
            series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
            series.tooltip.pointerOrientation = "vertical";
            
            // Create series
            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.dataFields.valueY = "value2";
            series2.dataFields.dateX = "date";
            series2.strokeWidth = 2;
            series2.strokeDasharray = "3,4";
            series2.stroke = series.stroke;
            
            // Add cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.xAxis = dateAxis;
            
            }); // end am4core.ready()
});
