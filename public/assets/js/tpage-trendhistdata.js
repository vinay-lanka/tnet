/*   
Template Name: Source Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4
Version: 1.5.0
Author: Sean Ngu
Website: http://www.seantheme.com/source-admin-v1.5/admin/
*/

var primary		        = '#2184DA',
    primaryTransparent  = 'rgba(33,132,218,0.15)',
    primaryLight	    = '#60A1DA',
    primaryDark	        = '#1e77c5',
    info		        = '#38AFD3',
    infoLight	        = '#6FBDD5',
    infoDark	        = '#2d8ca9',
    success		        = '#17B6A4',
    successTransparent	= 'rgba(23,182,264,0.15)',
    successLight	    = '#59C2B7',
    successDark	        = '#129283',
    warning		        = '#fcaf41',
    warningLight	    = '#EEBD77',
    warningDark	        = '#ca8c34',
    inverse		        = '#3C454D',
    inverseTransparent	= 'rgba(60,69,77,0.15)',
    grey		        = '#aab3ba',
    purple		        = '#5f50c5',
    purpleTransparent	= 'rgba(155,89,182,0.15)',
    purpleLight	        = '#7f73d1',
    purpleDark	        = '#4c409e',
    danger              = '#F04B46',
    white               = '#fff';	
	histocol			= '#2d6ea8';//'#1e77c5';
	trenddatcol			= '#2da372';//'#c03c38';
	trendmencol			= '#030700';//'#FF00FF';
	
var i, sample, data_min, data_max, data_min_org, data_max_org, average, range, range1_5, r_ave, variance, stddev;	
var data_name = "Data Name";

var data=[
99,		99.01,	99.02,	99.03,	99.04,	99.04,	99.03,	99.02,	99.01,	99,
98,		97.87,	97.3,	98.5,	99.5,	98,		97,		98.7,	98.1,	96.9,
97,		99.1,	98.6,	97.5,	99.5,	99,		97,		99.9,	100,	99,
97.87,	100.1,	101,	100.5,	99.5,	98,		97,		102,	100,	103,
97.87,	100.1,	101,	95.5,	99.5,	99,		97,		102,	100,	103,
100,	100.1,	101,	100.5,	99.5,	98,		97,		102,	100,	103,
100,	100.1,	101,	100.5,	99.5,	98,		97,		102,	100,	103,
100,	100.1,	101,	98.82,	99.5,	98,		97,		102,	100,	103,
98.82,	100.1,	101,	100.5,	99.5,	98,		97,		102,	100,	103,
104,	100.1,	101,	100.5,	99.5,	98,		97,		102,	103,	99.75,
];

sample=100;

var data_name_list = ["Cycle Time", "Injection Time", "Dosing Time", "Melt Cushion", "Mold Close Time", "Mold Open Time", "Mold Open Stop"];
var data_shot_list = [25, 50, 75, 100];

var data_hist=[], x_div_no;

init();

function init() 
{
	add_pdsparalist();
	add_pdsshotlist();
	data_name = "Cycle Time";
}

function add_pdsparalist(){
    
	for (var i = 0; i < data_name_list.length; i++)
	{
		var ul = document.getElementById("id-pdspara-list");
		var li = document.createElement("li");		
		 $('<a />')
            .text(data_name_list[i])
            .attr('href', '#')
			.attr('onclick', 'select_dataname('+i+')')
            .appendTo(li); 
		ul.appendChild(li);
	}
}

function add_pdsshotlist(){
    
	for (var i = 0; i < data_shot_list.length; i++)
	{
		var ul = document.getElementById("id-pdsshot-list");
		var li = document.createElement("li");		
		 $('<a />')
            .text('Last ' + data_shot_list[i] + ' shots')
            .attr('href', '#')
			.attr('onclick', 'set_sample(' + (25*i+25) + ')')
            .appendTo(li); 
		ul.appendChild(li);
	}
}

function select_dataname(data_list_nr)
{
	data_name = data_name_list[data_list_nr];
	//update the relevand pds data to data[]
	calculate_statvalues();
	calculate_histovalues();
	update_page_data();
	handleFlotTrackingChart_trend();
	handleFlotStackedChart();
}

function set_sample(list_nr)
{
	sample = list_nr;
	calculate_statvalues();
	calculate_histovalues();
	update_page_data();
	handleFlotTrackingChart_trend();
	handleFlotStackedChart();
}

function update_page_data()
{
	document.getElementById("id-dataname").innerHTML 		= data_name + " (Last " + sample + " shots)";	
	document.getElementById("id-sample").innerHTML 			= sample;
	document.getElementById("id-data_min_org").innerHTML	= precisionRound(data_min_org, 4); 
	document.getElementById("id-data_max_org").innerHTML	= precisionRound(data_max_org, 4);
	document.getElementById("id-average").innerHTML 		= precisionRound(average, 4);
	document.getElementById("id-range").innerHTML 			= precisionRound(range, 4);
	document.getElementById("id-r_ave").innerHTML 			= precisionRound(r_ave, 4);
	document.getElementById("id-stddev").innerHTML 			= precisionRound(stddev, 4);
	document.getElementById("id-variance").innerHTML 		= precisionRound(variance, 4);

}

function precisionRound(number, precision) 
{
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function calculate_statvalues()
{
	data_max_org=0; data_min_org=99999999999; average = 0; variance=0;

	for (i=0;i<sample;i++)
	{
		if(data[i]>data_max_org)
		{
			data_max_org=data[i];
		}
		if(data[i]<data_min_org)
		{
			data_min_org=data[i];
		}	
		average+=data[i]; 
	}

	average/=sample;
	range = data_max_org-data_min_org;
	r_ave=range/average;
	range1_5= range*1.5;
	data_max=average+range1_5;
	data_min=average-range1_5;

	for(i=0;i<sample;i++)
	{
		variance+=(Math.pow((data[i]-average),2));
	}
	variance/=(sample-1);

	stddev = Math.sqrt(variance);
}

function calculate_histovalues()
{
	var i, j, x_div_val, x_div_val1;
		
	x_div_no=sample/5;
	x_div_no=precisionRound(x_div_no, 0);
	
	for (i=0;i<=x_div_no;i++)
		data_hist[i]=0;  

	for (i=0;i<=x_div_no;i++)
	{
		x_div_val=(data_max_org-data_min_org)/x_div_no*i+data_min_org;
		x_div_val1=(data_max_org-data_min_org)/x_div_no*(i+1)+data_min_org;
		if (i<x_div_no)
		{
			for (j=0;j<sample;j++)
			{
				if (i==x_div_no-1)
				{
					if (data[j]>=x_div_val && data[j] <=x_div_val1)
					{
						data_hist[i]++;
					}
				}
				else
				{
					if (data[j]>=x_div_val && data[j] <x_div_val1)
					{
						data_hist[i]++;
					}
				}
				
			}
		}
	}
}
var handleFlotTrackingChart_trend = function () {
    "use strict";

	var d1 = [], d2 = [];
	var dataset=[];
	
	for (var i = 0; i < sample; i += 1) 
	{
        d1.push([i, data[i]]);
        d2.push([i, average]);
    }
	
    if ($('#flot-tracking-chart-trend').length !== 0) {
        var plot = $.plot($("#flot-tracking-chart-trend"),
        [ 
            { data: d1, label: data_name+" = -0.00", color: trenddatcol, shadowSize: 0,  points: { fillColor: '#ddd', show: false, radius: 2 },  lines: {show:true, fill:true,  fillColor: { colors: [{ opacity: 0.1 }, { opacity: 0.1}] }}, stack: false},
            { data: d2, label: "Mean = -0.00",       color: trendmencol, shadowSize: 0,  points: { fillColor: '#ddd', show: false, radius: 2 },  lines: {show:true, fill:false, fillColor: { colors: [{ opacity: 0.1 }, { opacity: 0.1}] }}, stack: false} 
        ],
        {
            series: {
                lines: { show: true}
            },
            crosshair: { mode: "x", color: danger,},
            grid: { hoverable: true, autoHighlight: true, borderColor: grey, borderWidth: 1 },
            xaxis: {  zoomRange: [0, null], panRange: [0, 100]   },
            yaxis: {  tickColor: '#ddd', min: data_min, max: data_max,  zoomRange: [0, null], panRange: [data_min, data_max] },
            legend: {
                labelBoxBorderColor: '#ddd',
                backgroundOpacity: 0.4,
                color:'#fff',
                show: true
            },
			zoom: { interactive: true },
			pan: { interactive: true  }
			
			
        });
        
        var legends = $("#flot-tracking-chart-trend .legendLabel");
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
				
			$('#id-shotno').html("Shot No: " + precisionRound(pos.x, 0));
			
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

        $("#flot-tracking-chart-trend").bind("plothover",  function (event, pos, item) {
            latestPosition = pos;
            if (!updateLegendTimeout) {
                updateLegendTimeout = setTimeout(updateLegend, 50);
            }
        });
    }
};

var handleFlotStackedChart = function () {
    "use strict";
	
	var i, x_div_val, x_div_val1;
	var d1 =[], ticksLabel =[];
	
    for (i = 0; i < x_div_no; i++) 
	{
		d1.push([i, data_hist[i]]);
    }	
	for (i = 0; i < x_div_no; i++)
	{	
		x_div_val  =(data_max_org-data_min_org)/x_div_no*i+data_min_org;
		x_div_val1 =(data_max_org-data_min_org)/x_div_no*(i+1)+data_min_org;
		x_div_val  =precisionRound(x_div_val, 2);				
		x_div_val1 =precisionRound(x_div_val1, 2);				
		ticksLabel.push([i, x_div_val+'-'+x_div_val1]);
	}
	
    var options = { 
        xaxis: {  tickColor: '#ddd',  ticks: ticksLabel, autoscaleMargin: 0.0, rotateTicks: 135},
        yaxis: {  tickColor: '#ddd'},
        grid: { 
            hoverable: true, 
            tickColor: "#ddd",
            borderWidth: 1,
            borderColor: grey
        },
        series: {
            stack: true,
            lines: { show: false, fill: false, steps: false },
            bars: { show: true, barWidth: 0.8, align: 'center', fillColor: null, },
            highlightColor: 'rgba(0,0,0,0.7)'
        },	 
        legend: {
            show: true,
            labelBoxBorderColor: '#ccc',
            position: 'ne',
            noColumns: 1
        }
    };
    var xData = [
        {
            data: d1,
            color: histocol,
            label: data_name,
            bars: {
                fillColor: histocol
            }
        }
    ];
    $.plot("#stacked-chart", xData, options);

    function showTooltip2(x, y, contents) {
        $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css( {
            top: y,
            left: x + 35
        }).appendTo("body").fadeIn(200);
    }
    
    var previousXValue = null;
    var previousYValue = null;
    $("#stacked-chart").bind("plothover", function (event, pos, item) {
        if (item) {
            var y = item.datapoint[1] - item.datapoint[2];
    
            if (previousXValue != item.series.label || y != previousYValue) {
                previousXValue = item.series.label;
                previousYValue = y;
                $("#tooltip").remove();

                //showTooltip2(item.pageX, item.pageY, y + " " + item.series.label);
                showTooltip2(item.pageX, item.pageY, y + " ");
            }
        }
        else {
            $("#tooltip").remove();
            previousXValue = null;
            previousYValue = null;       
        }
    });
};

/* Application Controller
------------------------------------------------ */
var PageDemo = function () {
	"use strict";
	
	return {
		//main function
		init: function () {
			calculate_statvalues();
			calculate_histovalues();
			update_page_data();
			handleFlotTrackingChart_trend();
			handleFlotStackedChart();
		}
    };
}();