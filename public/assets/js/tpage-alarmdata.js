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
    white               = '#fff',	
	alabarcol			= "rgba(192,60,56, 0.8)";
	
	
var alarm_data_raw =	[
							[11,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[11,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[3,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[4,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[15,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[6,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[2,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[3,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[4,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[15,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[11,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[4,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[15,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[6,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[7,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[7,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[8,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[6,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[10, "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
							[11,  "30.11.2018 :: 10:40:25", "30.11.2018 :: 10:44:05"],
						];
var alarm_text_data	=	[
							"Pump not running",
							"Cylinder heating off", 
							"Emergency stop operated",
							"Pump pressure transducer defective",
							"Ejector pressure transducer defective",
							"Injection pressure transducer defective",
							"Mould stroke measurement problem",
							"Ejector stroke measurement problem",
							"Screw stroke measurement problem",
							"Carriage stroke measurement problem",
							"MHA stroke measurement problem",
							"Mould stroke commissioning error",
							"Ejector stroke commissioning error",
							"Screw stroke commissioning error",
							"Carriage stroke commissioning error",
							"MHA stroke commissioning error",
							"Lubrication oil level too low",
							"Central lubrication not complete",
							"Front door limit switch sequence incorrect",
							"Hydraulic safety defective",											
						];
var alarm_data = [], alarm_barchart_data_raw = [], alarm_data_count = [];
var total_alarm_count = 0;
init();

function init() 
{
	ConstructAlarmData();
}

function ConstructAlarmData() 
{	
	var i = 0, j = 0, k = 0, l = 0, filehandle = -1;
	var count = 0, valmatch = false;
	/*
	<?php
		$filehandle = fopen("D:\1DEVELOPMENTS\HTML_learning\TnetAnalytics_v1.0\source_admin_v1.5\admin\assets\Datasource\AlarmText.txt", r);	
		while(!feof($filehandle)) 
		{
			//echo fgets($filehandle) . "<br>";
			alarm_text_data[i] = fgets($filehandle);
			i++;
		}
		fclose($filehandle);
	?>
	*/
	/*
	filehandle = open("D:/1DEVELOPMENTS/HTML_learning/TnetAnalytics_v1.0/source_admin_v1.5/admin/assets/Datasource/AlarmText.txt", 0);	//0-->read; 3-->write
	if (filehandle != -1)			//-1-->file successfully opened
	{
		 //while (($buffer = fgets($handle, 4096)) !== false)
		 {
			//alarm_text_data.push($buffer);
		 }
		//length = flength(fh); 		// Get the length of the file
		//str = fread(fh, length);	// Read in the entire file	
		close(filehandle);
	}
	*/
	
	for (i = 0; i < alarm_data_raw.length; i++)
	{
		alarm_barchart_data_raw.push( [255,0] );
	}
	for (i = 0; i < alarm_data_raw.length; i++)
	{
		alarm_data.push([   alarm_data_raw[i][1], alarm_data_raw[i][2],  alarm_text_data[alarm_data_raw[i][0]-1]  ]);	
	}
	
	for (i = 0; i < alarm_data_raw.length; i++)
	{
		valmatch = false;
		count = 0;
		for (j = 0; j < alarm_data_raw.length; j++)
		{	
			if (alarm_data_raw[i][0] == alarm_data_raw[j][0])
			{
				count++;
			}		
		}
		for (k = 0; k < alarm_barchart_data_raw.length; k++)
		{
			if (alarm_barchart_data_raw[k][0] == alarm_data_raw[i][0])
			{
				alarm_barchart_data_raw[k][1] = count;
				valmatch = true;
			}
		}
		if (valmatch == false)
		{
			alarm_barchart_data_raw[l][0] = alarm_data_raw[i][0];
			alarm_barchart_data_raw[l][1] = count;
			l++;
		}
	}

	for (i = 0; i < alarm_barchart_data_raw.length; i++)
	{
		if (alarm_barchart_data_raw[i][0] != 255)
		{
			total_alarm_count += alarm_barchart_data_raw[i][1];
		}
	}
	
	for (i = 0; i < alarm_barchart_data_raw.length; i++)
	{
		if (alarm_barchart_data_raw[i][0] != 255)
		{
			alarm_data_count.push([ alarm_barchart_data_raw[i][0], alarm_text_data[alarm_barchart_data_raw[i][0]-1], alarm_barchart_data_raw[i][1], alarm_barchart_data_raw[i][1]*100/total_alarm_count   ]);
		}
	}
}

var handleDataTableCombine_alarm = function() {
    "use strict";

    if ($('#data-table-alarm').length !== 0) {
        $('#data-table-alarm').DataTable({
			data: alarm_data,
            dom: 'lBfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            responsive: true,
            colReorder: false,
            select: true,
			lengthMenu:[20, 40, 80, 100],
        });
    }
};

var handleDataTableCombine_alarmcount = function() {
    "use strict";

    if ($('#data-table-alarmcount').length !== 0) {
        $('#data-table-alarmcount').DataTable({
			data: alarm_data_count,
            dom: 'lBfrtp',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            responsive: true,
            colReorder: false,
            select: true,
			paging: false,
			lengthChange:false,
			scrollX: true,
			scrollY: 300,
			scrollCollapse: true,
			
		  "rowCallback": function( row, alarm_data_count ) {
			  $('td', row).eq(0).css({color: "#000000", 'font-weight': 'normal', 'text-align': 'center' }); 
			  $('td', row).eq(2).css({color: "#000000", 'font-weight': 'normal', 'text-align': 'center' }); 
			  $('td', row).eq(3).css({color: "#F04B46", 'font-weight': 'bold',   'text-align': 'center' }); 
		  }
		  
        });
    }
};

var handleFlotStackedChart_alarm = function () {
    "use strict";
	
	var i;
	var d1 =[], ticksLabel =[];
	
    for (i = 0; i < alarm_barchart_data_raw.length; i++) 
	{
		if (alarm_barchart_data_raw[i][0] != 255)
			d1.push([ i, alarm_barchart_data_raw[i][1] ]);
    }	
	for (i = 0; i < alarm_barchart_data_raw.length; i++)
	{	
		if (alarm_barchart_data_raw[i][0] != 255)
			ticksLabel.push([ i, alarm_barchart_data_raw[i][0] ]);
	}
	
    var options = { 
        xaxis: {  tickColor: '#ddd',  ticks: ticksLabel, autoscaleMargin: 0.05},
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
            bars: { show: true, barWidth: 0.5, align: 'center', fillColor: null},
            highlightColor: 'rgba(0,0,0,0.7)'
        },	 
        legend: {
            show: true,
            labelBoxBorderColor: '#ccc',
            position: 'ne',
            noColumns: 1
        },
    };
    var xData = [
        {
            data: d1,
            color: alabarcol,
            label: "Alarm Count",
            bars: {
                fillColor: alabarcol
            }
        }
    ];
    $.plot("#stacked-chart-alarm", xData, options);
	
    function showTooltip2(title, x, y, alarmno, alarmcnt) {
		$(
			'<div id="tooltip" class="flot-tooltip f-s-13 no-bg"><div><b>' + title + '</b><\/div><div class="label label-success f-s-12">Alarm - ' + alarmno + '<\/div><div class="label label-important f-s-12 m-t-5">Count - ' + alarmcnt + '<\/div><\/div>'
		 
		 ).css
		({
            top: y,
            left: x + 10,
			position: 'absolute',
			display: 'none',
			width: 150,
			border: '0px solid #ccc',
			'background-color': 'transparent',
			'overflow-wrap': 'break-word',
			'word-wrap': 'break-word',
			'hyphens': 'auto',
			
        }).appendTo("body").fadeIn(800);
    }
	
    var previousXValue = null;
    var previousYValue = null;
    $("#stacked-chart-alarm").bind("plothover", function (event, pos, item) {
        if (item) {
			
            var x     = alarm_text_data[alarm_barchart_data_raw[item.datapoint[0]][0]-1];
			//var y_per = alarm_data_count[ alarm_barchart_data_raw[item.datapoint[0]][0] ][3];
			var y_per = alarm_data_count[ item.datapoint[0] ][3];
			var y     = item.datapoint[1];
    
            if (previousXValue != item.series.label || y != previousYValue) {
                previousXValue = item.series.label;
                previousYValue = y;
                $("#tooltip").remove();
                showTooltip2("", item.pageX, item.pageY, x, y + " (" + y_per + "%)");
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
           handleDataTableCombine_alarm();
		   handleFlotStackedChart_alarm();
		   handleDataTableCombine_alarmcount();
		}
  };
}();