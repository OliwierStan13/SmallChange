$(document).ready(function () { 
  
    // FETCHING DATA FROM JSON FILE 
    $.getJSON("PreviousTrades.json",  
            function (data) { 
        var stock = ''; 

        // ITERATING THROUGH OBJECTS 
        $.each(data, function (key, value) { 

            //CONSTRUCTION OF ROWS HAVING 
            // DATA FROM JSON OBJECT 
            stock += '<tr>'; 
            stock += '<td>' +  
                value.Units + '</td>'; 

            stock += '<td>' +  
                value.StockName + '</td>'; 

            stock += '<td>' +  
                value.PricePerShare + '</td>'; 

            stock += '<td>' +  
                value.DateInvested + '</td>'; 
            
            stock += '<td>' +  
                value.ProfitLoss + '</td>'; 

            stock += '<td>' +  
                value.ProfitLosspct + '</td>'; 

            stock += '<td>' +  
                value.InitialBuyAmount + '</td>';

            stock += '</tr>'; 
        }); 
          
        //INSERTING ROWS INTO TABLE  
        $('#table').append(stock); 
    }); 
});