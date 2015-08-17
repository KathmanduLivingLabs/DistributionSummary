$(function() {
var donorTableDeferred = $.Deferred();

$.ajax({
	url: "http://kathmandulivinglabs.github.io/DistributionSummary/donor_table.csv",
	success: function(data){
			var csvLines = data.split("\n");
			csvLines.pop();
			var csv2D = [];
			csvLines.forEach(function(item, index){
						csv2D.push(item.split(",").map(function(item2, index2){
										return Number(item2);	
									}));
					});
			var donorStats  = {
						cfpa: {
										totalcash: csv2D[2][2],
										plannedcash: csv2D[6][2],
										totalnfi: csv2D[4][2],
										plannednfi: csv2D[5][2]
									},
						dfid: {
										totalcash: csv2D[2][3],
										plannedcash: csv2D[6][3],
										totalnfi: csv2D[4][3],
										plannednfi: csv2D[5][3]
									},
						ofda: {
										totalcash: csv2D[2][4],
										plannedcash: csv2D[6][4],
										totalnfi: csv2D[4][4],
										plannednfi: csv2D[5][4]
									},
						private: {
										totalcash: csv2D[2][5],
										plannedcash: csv2D[6][5],
										totalnfi: csv2D[4][5],
										plannednfi: csv2D[5][5]
									},
						overall: {
										totalcash: csv2D[2][6],
										plannedcash: csv2D[6][6],
										totalnfi: csv2D[4][6],
										plannednfi: csv2D[5][6]
									}
					};
	
	
			donorTableDeferred.resolve(donorStats);
		}
});

function makeGraph() {
$.when(donorTableDeferred).done(function(donorStats){
	function UI_BarChart(options){
		var series;
		var barChart;
	
		var _generateChartData = function(){
				series = [[],[]];
		
				$.map(options.data, function(item, index){
				
							if(index!=="") {
											series[0].push((item[options.fields[1]]-item[options.fields[0]])>=0?item[options.fields[0]]:item[options.fields[1]]);
											series[1].push((item[options.fields[1]]-item[options.fields[0]])>=0?(item[options.fields[1]]-item[options.fields[0]]):0);
										}
						});
			};
	
		var _setOptions = function(newoptions){
				options.data = newoptions.data;
				options.fields = newoptions.fields;
			};
	
		var _update = function(options){
				_setOptions(options);
				_generateChartData();
				barChart.update({
							labels: Object.keys(options.data).clean("").map(function(item, index){return item.toUpperCase();}),
							series: series
						});
			};
	
		this.update = function(options){
				return _update(options);
			};
	
		_generateChartData();
	
		barChart = new Chartist.Bar(options.target, {
				labels: Object.keys(options.data).clean("").map(function(item, index){return item.toUpperCase();}),
				series: series
			}, {
					stackBars: true,
					horizontalBars: true,
					axisX: {
								labelInterpolationFnc: function(value) {
												return (value / 1000) + 'k';
											}
							}
				}).on('draw', function(data) {
						if(data.type === 'bar') {
									data.element.attr({
													style: 'stroke-width: 30px'
												});
								}
					});
	}

	Array.prototype.clean = function(deleteValue) {
		for (var i = 0; i < this.length; i++) {
				if (this[i] == deleteValue) {         
							this.splice(i, 1);
							i--;
						}
			}
		return this;
	};

		var barChart = new UI_BarChart({data:donorStats, target:".chart-1", fields: ["totalnfi", "plannednfi"]});

			$("a.nfi-chart span").click(function(e){
					barChart.update({
								data: donorStats,
								fields: ["totalnfi", "plannednfi"]
							});
					$(this).addClass("active");
					$("a.cash-chart span").removeClass("active");
				});

					$("a.cash-chart span").click(function(e){
							barChart.update({
										data: donorStats,
										fields: ["totalcash", "plannedcash"]
									});
							$(this).addClass("active");
							$("a.nfi-chart span").removeClass("active");
						});
});
}

$("#show_chart").click(function() {
	console.log("bye");
	if($("#chart_class").hasClass("dash-charts")) {
		makeGraph();
	}
});
});
