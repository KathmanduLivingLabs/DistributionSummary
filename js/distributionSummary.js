$(document).ready(function() {
    $('.close-button').hide();
    $('.pop_up_div').hide();
    
    var kllUrls = [];
    kllUrls[0] = "http://kathmandulivinglabs.github.io/DistributionSummary/distribution_summary.json";
    kllUrls[1] = "http://kathmandulivinglabs.github.io/DistributionSummary/distribution_summary_detailed.json";

    $.getJSON(kllUrls[0])
     .done(function(data) {
            
        var distribution_summary = data;
        
        $.getJSON(kllUrls[1])
         .done(function(data) {
        
            var donor_ward = data;
        
            var tbody = document.createElement("tbody");

            distribution_summary.forEach(function(item) {
            	var tr = document.createElement("tr");
            	Object.keys(item).forEach(function(entry) {
            		var td = document.createElement("td");
            		var tdText = document.createTextNode(item[entry]);
            		td.appendChild(tdText);
            		tr.appendChild(td);
            		if(item["District.y"] !== 'Total') {
            			tr.className = 'tblrow';
            			tr.id = item["distribution_information.vdc_name"];
            		}
            	});
            	tbody.appendChild(tr);
            });
            document.getElementById("distribution_summary_table").appendChild(tbody);

            $('.tblrow').click(function() {
            	var _this = this;
            	var text  = donor_ward.filter(function(vdc) {
            		return vdc["distribution_information.vdc_name"] === _this.id;
            	});
							var popUpHtml = '<div class="popup-header">' + this.id + '</div>';
            	popUpHtml += '<table><thead><th>Ward Number </th><th>NFI Distributed</th><th>Cash Distributed</th></thead><tbody>';
            	var keys = [];
            	try {
            	keys = Object.keys(text[0]);
            	} catch (e){}
            	keys.splice(0, 2);
                if(keys.length === 0)
                    popUpHtml += '<tr><td colspan="3" style="font-weight: bold; color: red;">No Ward Data Found For This VDC</td></tr>';
            	var indexDC = keys.indexOf("DistributedCash") + 1 ;
            	for(var index in keys) {
            		if(Number(index) === indexDC - 1)
            			break;
            		var cashDistributed = text[0][keys[Number(index) + indexDC]];
            		popUpHtml += '<tr><td>' + keys[index][4] + '</td><td>' + text[0][keys[index]] + '</td><td>' + cashDistributed + '</td></tr>';
            	}
            	$('.pop_up_div').html(popUpHtml);
                $('.pop_up_div').show();
                $('.close-button').show();
            });

            $('.close-button').click(function() {
                $( this ).hide();
                $('.pop_up_div').hide();
            });

        });
    });

});
