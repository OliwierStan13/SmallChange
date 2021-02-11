$(document).ready(function () { 
    //load data table
    $('#myTable').DataTable();

    //activate div toggle - show/hide on button click
    $("#showBtn").click(function(){
        $("#hiddenDiv").toggle('slow');
    });

    $.getJSON("portfolioData.json",  function (data) { 
        updateTableData(data);
        populateManualSort(data);

    }); 

    function populateManualSort(data){
        var length = Object.keys(data.portfolio).length;
        for(var i = 1; i < length+1; i++) 
        {
            var asset = data.portfolio['asset'+i];
            $('#namesToAdd').append("<tr><td>" + asset.asset_name + "</td></tr>");
        }
    }
    
    function updateTableData(data){
        $("#myTable").DataTable().clear();
        var length = Object.keys(data.portfolio).length;
        for(var i = 1; i < length+1; i++) 
        {
            var asset = data.portfolio['asset'+i];
            $('#myTable').dataTable().fnAddData( [
                asset.asset_name,
                asset.asset_type,
                asset.date_purchased,
                "€" + asset.price_paid,
                "€" + asset.price_now,
                asset.profit
            ]);
        }
    }


    $("#assetNameToSort").click(function () {
        //sort table
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, n = 0;
        table = document.getElementById("assetTable");
        switching = true;
        dir = "asc";
        while (switching) 
        {
            switching = false;
            rows = table.rows;
     
            for (i = 1; i < (rows.length - 1); i++) 
            {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
 
                if (dir == "asc") 
                {   
                    //compare items and swap if value is higher and tnen break
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                } 
                else if (dir == "desc") 
                {
                    //compare items and swap if value is lower and tnen break
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
            }
            if (shouldSwitch) //ascending sort
            {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;
            } 
            else //descending sort
            {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    });

    //charts diaplyed
    am4core.ready(function() {

        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        
        var chart = am4core.create('chartdiv', am4charts.XYChart)
        chart.colors.step = 2;
        
        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top'
        chart.legend.paddingBottom = 20
        chart.legend.labels.template.maxWidth = 95
        
        var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        xAxis.dataFields.category = 'category'
        xAxis.renderer.cellStartLocation = 0.1
        xAxis.renderer.cellEndLocation = 0.9
        xAxis.renderer.grid.template.location = 0;
        
        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;
        
        function createSeries(value, name) {
            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = value
            series.dataFields.categoryX = 'category'
            series.name = name
        
            series.events.on("hidden", arrangeColumns);
            series.events.on("shown", arrangeColumns);
        
            var bullet = series.bullets.push(new am4charts.LabelBullet())
            bullet.interactionsEnabled = false
            bullet.dy = 30;
            bullet.label.text = '{valueY}'
            bullet.label.fill = am4core.color('#ffffff')
        
            return series;
        }
        
        chart.data = [
            {
                category: 'Moderna',
                first: 98.32,
                second: 126.21
            },
            {
                category: 'Amazon',
                first: 121.76,
                second: 140.32
            },
            {
                category: 'Apple',
                first: 136.91,
                second: 144.32
            }
        ]
        
        
        createSeries('first', 'Price at purchase');
        createSeries('second', 'Price now');
        
        function arrangeColumns() {
        
            var series = chart.series.getIndex(0);
        
            var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
            if (series.dataItems.length > 1) {
                var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                var delta = ((x1 - x0) / chart.series.length) * w;
                if (am4core.isNumber(delta)) {
                    var middle = chart.series.length / 2;
        
                    var newIndex = 0;
                    chart.series.each(function(series) {
                        if (!series.isHidden && !series.isHiding) {
                            series.dummyData = newIndex;
                            newIndex++;
                        }
                        else {
                            series.dummyData = chart.series.indexOf(series);
                        }
                    })
                    var visibleCount = newIndex;
                    var newMiddle = visibleCount / 2;
        
                    chart.series.each(function(series) {
                        var trueIndex = chart.series.indexOf(series);
                        var newIndex = series.dummyData;
        
                        var dx = (newIndex - trueIndex + middle - newMiddle) * delta
        
                        series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                        series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    })
                }
            }
        }
        
    });



































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
