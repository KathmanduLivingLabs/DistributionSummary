var ctx = [];
ctx[0] = document.getElementById('cfpaBarChart').getContext("2d");
ctx[1] = document.getElementById('dfidBarChart').getContext("2d");
ctx[2] = document.getElementById('ofdaBarChart').getContext("2d");
ctx[3] = document.getElementById('privateBarChart').getContext("2d");


var table = getElementByXpath('//*[@id="donor_div"]/table');
var firstRow = [];
firstRow[0] = table.rows[0].cells;
firstRow[1] = table.rows[1].cells;
firstRow[2] = table.rows[2].cells;
firstRow[3] = table.rows[3].cells;
firstRow[4] = table.rows[4].cells;

var cfpaDonorData = [];
var dfidDonorData = [];
var ofdaDonorData = [];
var privateDonorData = [];
var donorData = [[1,2],[3,4],[5,6],[7,8]];
for(var i = 1; i < 4; i++) {
	for(var j = 0; j < 4; j++) {
		donorData[j][i - 1] = firstRow[i][j + 1].innerHTML.replace(/\,/g,'');
		donorData[j][i - 1] = Number(donorData[j][i - 1]);
	}
}

donorData[0][3] = firstRow[4][1].innerHTML.replace(/\,/g, '');
donorData[0][3] = Number(donorData[0][3]);
donorData[1][3] = firstRow[4][2].innerHTML.replace(/\,/g, '');
donorData[1][3] = Number(donorData[1][3]);
donorData[2][3] = firstRow[4][3].innerHTML.replace(/\,/g, '');
donorData[2][3] = Number(donorData[2][3]);
donorData[3][3] = firstRow[4][4].innerHTML.replace(/\,/g, '');
donorData[3][3] = Number(donorData[3][3]);


var data = [];
for(var i = 0; i < 4; i++) {
	data[i] = {
		labels: ["Cash Allocated", "Cash Distributed", "NFI Allocated", "NFI Distributed"],
		datasets: [
			{
				label: "Donor Dataset",
				fillColor: "rgba(151,187,205,0.5)",
				strokeColor: "rgba(151,187,205,0.8)",
				highlightFill: "rgba(151,187,205,0.75)",
				highlightStroke: "rgba(151,187,205,1)",
				data: donorData[i]
			}
		]
	};
}


var options = {
	//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};

var donorBarChart = [];
for(i = 0; i < 4; i++)
	donorBarChart[i] = new Chart(ctx[i]).Bar(data[i], options);



function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
