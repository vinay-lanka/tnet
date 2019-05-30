/*   
Template Name: Source Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4
Version: 1.5.0
Author: Sean Ngu
Website: http://www.seantheme.com/source-admin-v1.5/admin/
*/


Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontColor = '#333';
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

var primary		= '#2184DA',
    primaryLight= '#60A1DA',
    primaryDark	= '#1e77c5',
    info		= '#38AFD3',
    infoLight	= '#6FBDD5',
    infoDark	= '#2d8ca9',
    success		= '#17B6A4',
    successLight= '#59C2B7',
    successDark	= '#129283',
    warning		= '#fcaf41',
    warningLight= '#EEBD77',
    warningDark	= '#ca8c34',
    inverse		= '#3C454D',
    grey		= '#aab3ba',
    /*
	purple		= '#5f50c5',
    purpleLight	= '#7f73d1',
    purpleDark	= '#4c409e',
	*/
    danger      = '#F04B46';

var purple = '#9b59b6';
var purpleLight = '#BE93D0';
var purpleDark = '#7c4792';
var dangerLight = '#F58A87';
var dangerDark = '#c03c38';
var lime = '#65C56F';
var white = '#fff';
var fontFamily = 'inherit';
var fontWeight = 'normal';
var fontStyle = 'normal';

	
	
var i, totparts, prodced, rejects, totprodced, prodper, goodper, rejectper, totaluptime, totaldntime, totaluptimeper, totaldntimeper, totaltime;

data_productivity1	= [200, 120, 150, 170, 180, 200, 160, 200, 85, 95, 150, 300, 325, 290, 300, 305, 100, 120, 150, 170, 180, 200, 160, 200];
data_quality1      	= [100, 120, 150, 170, 180, 200, 300, 100, 120, 150, 170, 180, 200, 300, 300, 300, 300, 300, 300, 300, 300, 150, 300, 400];
data_utilization1  	= [2, 3, 10, 10, 25, 30, 30, 26, 2, 3, 10, 10, 25, 30, 30, 26, 2, 3, 10, 10, 25, 30, 30, 26];
data_oee1      		= [85, 78, 95, 93, 98.3, 99, 99.5, 99, 85, 90, 95, 93, 98.3, 99, 99.5, 99, 85, 93, 95, 93, 98.3, 99, 99.5, 99];

data_productivity2	= [];
data_quality2      	= [100, 10, 55, 23, 23, 15, 17, 10, 13, 22, 20, 20, 20, 3, 10, 20, 20, 21, 10, 5, 8, 150, 0, 3];
data_utilization2  	= [26, 30, 30, 25, 10, 10, 3, 2, 26, 30, 30, 10, 25, 30, 30, 26, 2, 3, 10, 10, 25, 30, 30, 26];
data_oee2      		= [];

label_productivity1	= "Parts Produced";
label_quality1		= "Good Parts";
label_utilization1	= "Up Time";
label_oee1			= "Oee";

label_productivity2	= "";
label_quality2		= "Rejects";
label_utilization2	= "Down Time";
label_oee2			= "";

color_productivity1	= '#4c409e';	color_productivity2 = '#7f73d1';
color_quality1 		= '#1F5F89';	color_quality2 		= '#3498DB';
color_utilization1 	= '#B34902';	color_utilization2 	= '#E67E22';
color_oee1 			= '#129283';	color_oee2 			= '#45C4B6';

var d1 = [], d2 = [], ticksLabel = [];
var d1_color, d1_fillcolor, d1_label, d2_color, d2_fillcolor, d2_label;
var rpttmr = setInterval(myTimer ,1000);

init();

function init() 
{
	for (i = 0; i < 24; i += 1){ticksLabel.push([i, i+1]);}
	for (i = 0; i < ticksLabel.length; i += 1){d1.push([i, data_productivity1[i]]);}
	for (i = 0; i < ticksLabel.length; i += 1){d2.push([i, data_productivity2[i]]);}
	d1_color 		= color_productivity1;	d2_color 		= color_productivity2;
	d1_fillcolor	= color_productivity1;	d2_fillcolor	= color_productivity2;
	d1_label 		= label_productivity1;	d2_label 		= label_productivity2;

}

function myTimer() {
  var d = new Date();
  document.getElementById("id-date").innerHTML = d.toLocaleDateString();
  document.getElementById("id-time").innerHTML = '<small>' + d.toLocaleTimeString() + '</small>';
}

function precisionRound(number, precision) 	//modified
{
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

totparts=8000;
prodced=6000;
rejects=2300;
totprodced=prodced+rejects;
prodper= precisionRound(prodced/totparts*100, 2);
goodper=precisionRound(prodced/totprodced*100, 2);
rejectper=precisionRound(rejects/totprodced*100, 2);

totaluptime = 22;
totaldntime = 2;
totaltime   = totaluptime+totaldntime;
totaluptimeper = precisionRound(totaluptime/totaltime*100, 2);
totaldntimeper = precisionRound(totaldntime/totaltime*100, 2);

/*
***********************OVERALL EQUIPEMENT EFFECTIVENSS (OEE)*****************************************
OEE is calculated for last 24 hours. This has to be extended to different time scales.

OEE 			= 	UTILIZATION x PRODUCTIVITY x QUALITY

					    ACTUAL RUN TIME------------> machine up time in last 24 hrs (24 hrs - scheduled down time - un-scheduled down time)        
UTILIZATION		= 	----------------------- 
					PLANNED PRODUCTION TIME--------> 24 hrs - scheduled down time

					
					|--------------------------------------------------------> ideal cycle time required to produce one part in last 24 hrs
					|                                    |-------------------> total part produced including rejects in last 24 hrs
					MACHINE IDEAL CYCLE TIME x TOTAL PARTS PRODUCED
PRODUCTIVITY	=	--------------------------------------------------
							      PLANNED PRODUCTION TIME--------------------> 24 hrs - scheduled down time

					 GOOD PARTS PRODUCED-------> total parts produced - rejects		   
QUALITY 		=	---------------------
					 TOTAL PARTS PRODUCED------> total parts produced including rejects 
				

*****************************************************************************************************
<html>
<body>

<p>A script on this page starts this clock:</p>

<p id="demo"></p>

<button onclick="clearInterval(myVar)">Stop time</button>

<script>
var myVar = setInterval(myTimer ,1000);
function myTimer() {
  var d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
</script>

</body>
</html>

*/

document.getElementById("id-macnoid").innerHTML 		=  "TD - 01800012/SPF BAY MC.No. 10";	
document.getElementById("id-macspec").innerHTML 		=  "180/510 - 600";	
document.getElementById("id-pmphtrstat").innerHTML 		=  'Pump:' +'<span class="text-danger"> OFF </span>' + '/Heater:' + '<span class="text-lime"> ON </span>';	
document.getElementById("id-macmode").innerHTML 		=  "Mode: Manual";	
document.getElementById("id-mldid_prodcode").innerHTML	=  "Mold Id/Product Code";	
document.getElementById("id-shotwt").innerHTML 			=  "12.5 gm";	
document.getElementById("id-cyctim_minmax").innerHTML 	=  "Min:20.5s/Max:21.3s";	
document.getElementById("id-cyctim_actual").innerHTML 	=  "21 secs";	

document.getElementById("id-totalparts").innerHTML 		= totparts;
document.getElementById("id-totalproduced").innerHTML 	= prodced     + '<small>' + ' (' + prodper        + '%)</small>';
document.getElementById("id-goodparts").innerHTML 		= prodced     + '<small>' + ' (' + goodper        + '%)</small>';
document.getElementById("id-rejects").innerHTML 		= rejects     + '<small>' + ' (' + rejectper      + '%)</small>';
document.getElementById("id-totaluptim").innerHTML 		= totaluptime + '<small>' + ' (' + totaluptimeper + '%)</small>';
document.getElementById("id-totaldntim").innerHTML 		= totaldntime + '<small>' + ' (' + totaldntimeper + '%)</small>';
document.getElementById("id-oee").innerHTML 			= 85 + '%';

document.getElementById("id-mcper-productivity").innerHTML	= prodper + '%';
document.getElementById("id-mcper-quality").innerHTML 		= goodper + '%';
document.getElementById("id-mcper-utilization").innerHTML 	= totaluptimeper + '%';
document.getElementById("id-mcper-oee").innerHTML 			= 85 + '%';



function MouseOver(performance_metric_no) 
{
	/*
	switch (performance_metric_no)
	{
		case 0:	(document.getElementById("myDIV1")).classList.add("bg-purple-light");	break;
		case 1:	(document.getElementById("myDIV2")).classList.add("bg-primary-light");	break;
		case 2:	(document.getElementById("myDIV3")).classList.add("bg-warning-light");	break;
		case 3:	(document.getElementById("myDIV4")).classList.add("bg-success-light");	break;
	}
	*/
}

function MouseOut(performance_metric_no) 
{
	/*
	switch (performance_metric_no)
	{
		case 0:	(document.getElementById("myDIV1")).classList.remove("bg-purple-light");	break;
		case 1:	(document.getElementById("myDIV2")).classList.remove("bg-primary-light");	break;
		case 2:	(document.getElementById("myDIV3")).classList.remove("bg-warning-light");	break;
		case 3:	(document.getElementById("myDIV4")).classList.remove("bg-success-light");	break;
	}
	*/
}

function update_dashboard_graph(performance_metric_no)
{
	d1.splice(0, d1.length);
	d2.splice(0, d2.length);
	
	switch (performance_metric_no)
	{
		case 0:	
				(document.getElementById("id-graphtitle")).innerHTML = 'Productivity <small> Last 24 hrs</small>';		
				for (i = 0; i < data_productivity1.length; i += 1){d1.push([i, data_productivity1[i]]);}
				for (i = 0; i < data_productivity2.length; i += 1){d2.push([i, data_productivity2[i]]);}
				d1_color 		= color_productivity1;	d2_color 		= color_productivity2;
				d1_fillcolor	= color_productivity1;	d2_fillcolor	= color_productivity2;
				d1_label 		= label_productivity1;	d2_label 		= label_productivity2;
				handleDashboardStackedChart();
				break;
		case 1:	
				(document.getElementById("id-graphtitle")).innerHTML = 'Quality <small> Last 24 hrs</small>';
				for (i = 0; i < data_quality1.length; i += 1){d1.push([i, data_quality1[i]]);}
				for (i = 0; i < data_quality2.length; i += 1){d2.push([i, data_quality2[i]]);}
				d1_color 		= color_quality1;	d2_color 		= color_quality2;
				d1_fillcolor	= color_quality1;	d2_fillcolor	= color_quality2;
				d1_label 		= label_quality1;	d2_label 		= label_quality2;				
				handleDashboardStackedChart();
				break;
		case 2:	
				(document.getElementById("id-graphtitle")).innerHTML = 'Utilization <small> Last 24 hrs</small>';	
				for (i = 0; i < data_utilization1.length; i += 1){d1.push([i, data_utilization1[i]]);}
				for (i = 0; i < data_utilization2.length; i += 1){d2.push([i, data_utilization2[i]]);}
				d1_color 		= color_utilization1;	d2_color 		= color_utilization2;
				d1_fillcolor	= color_utilization1;	d2_fillcolor 	= color_utilization2;
				d1_label 		= label_utilization1;	d2_label 		= label_utilization2;				
				handleDashboardStackedChart();
				break;
		case 3:	
				(document.getElementById("id-graphtitle")).innerHTML = 'OEE <small> Last 24 hrs</small>';	
				for (i = 0; i < data_oee1.length; i += 1){d1.push([i, data_oee1[i]]);}
				for (i = 0; i < data_oee2.length; i += 1){d2.push([i, data_oee2[i]]);}
				d1_color 		= color_oee1;	d2_color 		= color_oee2;
				d1_fillcolor	= color_oee1;	d2_fillcolor 	= color_oee2;
				d1_label 		= label_oee1;	d2_label 		= label_oee2;				
				handleDashboardStackedChart();
				break;
	}
}

var handleDashboardStackedChart = function () {
    "use strict";
   
    var options = { 
        xaxis: {  tickColor: '#ddd',  ticks: ticksLabel, autoscaleMargin: 0.03, zoomRange: [0, null], panRange: [0, 24]},
        yaxis: {  tickColor: '#ddd', zoomRange: [0, null], panRange: [0, 350]},
        grid: { 
            hoverable: true, 
            tickColor: "#ddd",
            borderWidth: 1,
            borderColor: grey
        },
        series: {
            stack: true,
            lines: { show: false, fill: false, steps: false },
            bars: { show: true, barWidth: 0.5, align: 'center', fillColor: null},
            highlightColor: 'rgba(0,0,0,0.8)'
        },	 
        legend: {
            show: true,
            labelBoxBorderColor: '#ccc',
            position: 'ne',
            noColumns: 1
        },
		zoom: { interactive: true },
		pan: { interactive: true  }

    };
	
    var xData = [
        {
            data: d1,
            color: d1_color,
            label: d1_label,
            bars: {
                fillColor: d1_fillcolor
            }
        },	
        {
            data: d2,
            color: d2_color,
            label: d2_label,
            bars: {
                fillColor: d2_fillcolor
            }
        },
    ];
    $.plot("#stacked-chart-dashboard", xData, options);

    function showTooltip2(x, y, contents) {
        $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css( {
            top: y,
            left: x + 35
        }).appendTo("body").fadeIn(200);
    }
    
    var previousXValue = null;
    var previousYValue = null;
    $("#stacked-chart-dashboard").bind("plothover", function (event, pos, item) {
        if (item) {
            var y = item.datapoint[1] - item.datapoint[2];
    
            if (previousXValue != item.series.label || y != previousYValue) {
                previousXValue = item.series.label;
                previousYValue = y;
                $("#tooltip").remove();

                showTooltip2(item.pageX, item.pageY, y + " " + item.series.label);
            }
        }
        else {
            $("#tooltip").remove();
            previousXValue = null;
            previousYValue = null;       
        }
    });
};
	
var handleDoughnutChart = function() {
    
    var ctx2 = document.getElementById('doughnut-chrome').getContext("2d");
    var ctx3 = document.getElementById('doughnut3').getContext("2d");
    var ctx4 = document.getElementById('doughnut4').getContext("2d");
    var ctx5 = document.getElementById('doughnut5').getContext("2d");

    var gradient2 = ctx2.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, 'rgba(72, 85, 99, 0.1)');   
    gradient2.addColorStop(1, 'rgba(41, 50, 60, 0.2)');

    var randomScalingFactor = function(){ return Math.round(Math.random()*100); };
    var data2 = {
        labels: ['Bal', 'Prod'],
        datasets: [{
            data: [100-prodper, prodper],
			backgroundColor: ['#7f73d1', '#4c409e'],
			borderColor: ['#fff', '#fff'],
            borderWidth: 2,
			animation : false,
        }]
    };
    var data3 = {
        labels: ['Rejects', 'Good'],
        datasets: [{
            data: [rejectper, goodper],
            backgroundColor: ['#3498DB', '#1F5F89'],
            borderColor: ['#fff', '#fff'],
            borderWidth: 2,
        }]
    };
    var data4 = {
        labels: ['Down', 'Up'],
        datasets: [{
            data: [totaldntimeper, totaluptimeper],
            backgroundColor: ['#E67E22', '#B34902'],
            borderColor: ['#fff', '#fff'],
            borderWidth: 2,
        }]
    };
    var data5 = {
        labels: ['', 'OEE'],
        datasets: [{
            data: [100-85, 85],
			backgroundColor: ['#45C4B6', '#129283'],
            borderColor: ['#fff', '#fff'],
            borderWidth: 2,
        }]
    };
    
    new Chart(ctx2, {
        data: data2,
        type: 'doughnut'
    });
    new Chart(ctx3, {
        data: data3,
        type: 'doughnut'
    });
    new Chart(ctx4, {
        data: data4,
        type: 'doughnut'
    });
    new Chart(ctx5, {
        data: data5,
        type: 'doughnut'
    });
};

var handleMachinePerformanceChart = function() {
    "use strict";
    
    var targetChart = '#flot-macperfo-chart';
    var d1 = [];
    var d2 = [];
    var d3 = [];
	var d4 = [];
    for (var i = 0; i < data_productivity1.length; i += 1) {d1.push([i, data_productivity1[i]]);}
    for (var i = 0; i < data_quality1.length;      i += 1) {d2.push([i, data_quality1[i]]);}
    for (var i = 0; i < data_utilization1.length;  i += 1) {d3.push([i, data_utilization1[i]]);}
    for (var i = 0; i < data_oee1.length;          i += 1) {d4.push([i, data_oee1[i]]);}

	var options = {
		series: {
			curvedLines: {
				apply: true,
				active: true,
				monotonicFit: true
			}
		},
		//crosshair: { mode: "x", color: danger,},
		grid: {
			borderWidth: 0,
			borderColor: grey,
			autoHighlight: true,
			hoverable: false,
		},			 
		legend: {
			labelBoxBorderColor: '#ddd',
			backgroundOpacity: 0.4,
			color:'#fff',
			show: false
		},
		xaxis: {
			font: {
				size: 11,
				lineHeight: 16,
				style: fontStyle,
				weight: fontWeight,
				family: fontFamily,
				color: inverse
			},
			zoomRange: [0, null], panRange: [0, 23]
		},
		yaxis: {
			font: {
				size: 11,
				lineHeight: 16,
				style: fontStyle,
				weight: fontWeight,
				family: fontFamily,
				color: inverse
			},
			zoomRange: [0, null], panRange: [0, 1000]
		},
		zoom: { interactive: true },
		pan: { interactive: true  }
		
	};

	
    if ($(targetChart).length !== 0) {
        var targetHeight = $(targetChart).attr('data-height');
        $(targetChart).height(targetHeight);

		var plot = $.plot($(targetChart),
        [ 
               {data: d1, label: "Productivity = -0.00", color: color_productivity1, points: { fillColor: color_productivity2, show: false, radius: 3 }, lines: { show: true, fill: true, fillColor: color_productivity2, shadow: false }, stack: true,  },
               {data: d2, label: "Quality = -0.00",      color: color_quality1,      points: { fillColor: color_quality2,      show: false, radius: 3 }, lines: { show: true, fill: true, fillColor: color_quality2,      shadow: false }, stack: true,  },
               {data: d3, label: "Utilization = -0.00",  color: color_utilization1,  points: { fillColor: color_utilization2,  show: false, radius: 3 }, lines: { show: true, fill: true, fillColor: color_utilization2,  shadow: false }, stack: true,  },
               {data: d4, label: "OEE = -0.00",          color: color_oee1,          points: { fillColor: color_oee2,          show: false, radius: 3 }, lines: { show: true, fill: true, fillColor: color_oee2,          shadow: false }, stack: true,  }
        ], options
    );

		var legends = $("#flot-macperfo-chart .legendLabel");
        legends.each(function () {
            $(this).css('width', $(this).width());
        });

        var updateLegendTimeout = null;
        var latestPosition = null;
		
		function updateLegend() {
			updateLegendTimeout = null;
			var pos = latestPosition;

			var axes = plot.getAxes();
			if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
				pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
				return;
			}
			var i, j, dataset = plot.getData();
			for (i = 0; i < dataset.length; ++i) {
				var series = dataset[i];

				for (j = 0; j < series.data.length; ++j) {
					if (series.data[j][0] > pos.x) {
						break;
					}
				}
			
			var y, p1 = series.data[j - 1], p2 = series.data[j];
            if (p1 === null) {
                y = p2[1];
            } else if (p2 === null) {
                y = p1[1];
            } else {
                y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
            }

            legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
        }
    }

        $(targetChart).bind("plothover",  function (event, pos, item) {
            latestPosition = pos;
            if (!updateLegendTimeout) {
                updateLegendTimeout = setTimeout(updateLegend, 50);
            }
        });		
		
    }
}

var handleDashboardGritterNotification = function() {
    setTimeout(function() {
        $.gritter.add({
            title: 'Welcome back, Admin!',
            text: 'You have 5 new notifications. Please check your inbox.',
            image: '../assets/img/user_profile.jpg',
            sticky: true,
            time: '',
            class_name: 'my-sticky-class'
        });
    }, 1000);
};

var handleWidgetReload = function() {
    "use strict"; 
    
    $(document).on('click', '[data-click="widget-reload"]', function(e) {
        e.preventDefault();
    
        var targetWidget = $(this).closest('.widget');
        $(targetWidget).append('<div class="widget-loader"><span class="spinner-small">Loading...</span></div>');
    
        setTimeout(function() {
            $(targetWidget).find('.widget-loader').remove();
        }, 1500);
    });
};

/* Application Controller
------------------------------------------------ */
var PageDemo = function () {
	"use strict";
	
	return {
		//main function
		init: function () {
            handleDoughnutChart();
			handleDashboardStackedChart();
			handleMachinePerformanceChart();
		    //handleDashboardGritterNotification();
		    handleWidgetReload();
		}
    };
}();