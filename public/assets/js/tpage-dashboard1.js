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
    purple		= '#5f50c5',
    purpleLight	= '#7f73d1',
    purpleDark	= '#4c409e',
    danger      = '#F04B46';

var totparts, prodced, rejects, totprodced, prodper, goodper, rejectper;

//light-normal-dark
var color_productivity1	= 'rgba(127, 115, 209, 0.3)',	color_productivity_border1	= '#5f50c5',	color_productivity_point1	= '#4c409e';
var color_quality1 		= 'rgba(77,  156, 225, 0.3)', 	color_quality_border1 		= '#2184DA', 	color_quality_point1		= '#1e77c5';
var color_utilization1 	= 'rgba(252, 191, 103, 0.3)', 	color_utilization_border1 	= '#fcaf41', 	color_utilization_point1 	= '#ca8c34';
var color_oee1 			= 'rgba(69,  196, 182, 0.3)', 	color_oee_border1 			= '#17B6A4', 	color_oee_point1 			= '#129283';
var color_linechart1 	= color_productivity1, 			color_linechart_border1  	= color_productivity_border1, color_linechart_point1 = color_productivity_point1;

var color_productivity2	= 'rgba(161, 164, 168, 0.3)',	color_productivity_border2	= '#5f50c5',	color_productivity_point2	= '#4c409e';
var color_quality2 		= 'rgba(30,  119, 197, 0.3)', 	color_quality_border2 		= '#2184DA', 	color_quality_point2		= '#1e77c5';
var color_utilization2 	= 'rgba(161, 164, 168, 0.3)', 	color_utilization_border2 	= '#fcaf41', 	color_utilization_point2 	= '#ca8c34';
var color_oee2 			= 'rgba(161, 164, 168, 0.3)', 	color_oee_border2 			= '#17B6A4', 	color_oee_point2 			= '#129283';
var color_linechart2 	= color_productivity2, 			color_linechart_border2		= color_productivity_border2, color_linechart_point2 = color_productivity_point2;

labels_productivity = [0, 1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
labels_quality     	= [0, 1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
labels_utilization 	= [0, 1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
labels_oee      	= [0, 1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

data_productivity1	= [100, 120, 150, 170, 180, 200, 160, 200, 85, 95, 150, 300, 325, 290, 300, 305, 100, 120, 150, 170, 180, 200, 160, 200];
data_quality1      	= [100, 120, 150, 170, 180, 200, 300, 100, 120, 150, 170, 180, 200, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
data_utilization1  	= [2, 3, 10, 10, 25, 30, 30, 26, 2, 3, 10, 10, 25, 30, 30, 26, 2, 3, 10, 10, 25, 30, 30, 26];
data_oee1      		= [85, 78, 95, 93, 98.3, 99, 99.5, 99, 85, 90, 95, 93, 98.3, 99, 99.5, 99, 85, 93, 95, 93, 98.3, 99, 99.5, 99];

data_productivity2	= [];
data_quality2      	= [20, 10, 55, 23, 23, 15, 17, 10, 13, 22, 20, 20, 20, 3, 10, 20, 20, 21, 10, 5, 8, 0, 0, 3];
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

var lineChartData = {
	labels : labels_productivity,
	datasets : [
		{
			label: label_productivity1,
			borderWidth: 2,
			pointBorderWidth: 2,
			pointRadius: 5,
			backgroundColor : color_linechart1,
			borderColor : color_linechart_border1,
			pointBackgroundColor : color_linechart_point1,
			pointBorderColor : "#fff",
			pointHoverBackgroundColor : "#fff",
			pointHoverBorderColor : "#333",
			data : data_productivity1
		},
		{
			label: label_productivity2,
			borderWidth: 2,
			pointBorderWidth: 2,
			pointRadius: 5,
			backgroundColor : color_linechart2,
			borderColor : color_linechart_border2,
			pointBackgroundColor : color_linechart_point2,
			pointBorderColor : "#fff",
			pointHoverBackgroundColor : "#fff",
			pointHoverBorderColor : "#333",
			data : data_productivity2
		}		
	]
};

init();

function init() 
{
	color_linechart1 		= color_productivity1;
	color_linechart_border1 = color_productivity_border1;
	color_linechart_point1 	= color_productivity_point1;

	color_linechart2 		= color_productivity2;
	color_linechart_border2 = color_productivity_border2;
	color_linechart_point2 	= color_productivity_point2;
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
prodper=prodced/totparts*100;
goodper=prodced/totprodced*100;
rejectper=rejects/totprodced*100;

document.getElementById("id-macnoid").innerHTML 		=  "TD - 01800012/SPF BAY MC.No. 10";	
document.getElementById("id-macspec").innerHTML 		=  "180/510 - 600";	
document.getElementById("id-pmphtrstat").innerHTML 		=  "Pump:OFF/Heater:ON";	
document.getElementById("id-macmode").innerHTML 		=  "Mode: Manual";	
document.getElementById("id-mldid_prodcode").innerHTML	=  "Mold Id/Product Code";	
document.getElementById("id-shotwt").innerHTML 			=  "12.5 gm";	
document.getElementById("id-cyctim_minmax").innerHTML 	=  "Min:20.5s/Max:21.3s";	
document.getElementById("id-cyctim_actual").innerHTML 	=  "21 secs";	

document.getElementById("id-totalparts").innerHTML 		= totparts;
document.getElementById("id-totalproduced").innerHTML 	= prodced + '<small>' + ' (' + precisionRound(prodper, 2) + '%)</small>';
document.getElementById("id-goodparts").innerHTML 		= prodced + '<small>' + ' (' + precisionRound(goodper, 2) + '%)</small>';
document.getElementById("id-rejects").innerHTML 		= rejects + '<small>' + ' (' + precisionRound(rejectper, 2) + '%)</small>';


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
	switch (performance_metric_no)
	{
		case 0:	
				(document.getElementById("id-graphtitle")).innerHTML = 'Productivity <small> Last 24 hrs</small>';
				dashboardLineChart.data.datasets[0].backgroundColor = color_productivity1;
				dashboardLineChart.data.datasets[0].borderColor = color_productivity_border1;
				dashboardLineChart.data.datasets[0].pointBackgroundColor = color_productivity_point1;
				dashboardLineChart.data.datasets[0].labels = labels_productivity;
				dashboardLineChart.data.datasets[0].data = data_productivity1;
				dashboardLineChart.data.datasets[0].label = label_productivity1;	
				dashboardLineChart.data.datasets[1].backgroundColor = color_productivity2;
				dashboardLineChart.data.datasets[1].borderColor = color_productivity_border2;
				dashboardLineChart.data.datasets[1].pointBackgroundColor = color_productivity_point2;
				dashboardLineChart.data.datasets[1].data = data_productivity2;
				dashboardLineChart.data.datasets[1].label = label_productivity2;
				dashboardLineChart.update();
				//handleRenderDashboardChart();
				break;
		case 1:	
				(document.getElementById("id-graphtitle")).innerHTML = 'Quality <small> Last 24 hrs</small>';
				dashboardLineChart.data.datasets[0].backgroundColor = color_quality1;
				dashboardLineChart.data.datasets[0].borderColor = color_quality_border1;
				dashboardLineChart.data.datasets[0].pointBackgroundColor = color_quality_point1;
				dashboardLineChart.data.datasets[0].labels = labels_quality;
				dashboardLineChart.data.datasets[0].data = data_quality1;
				dashboardLineChart.data.datasets[0].label = label_quality1;
				dashboardLineChart.data.datasets[1].backgroundColor = color_quality2;
				dashboardLineChart.data.datasets[1].borderColor = color_quality_border2;
				dashboardLineChart.data.datasets[1].pointBackgroundColor = color_quality_point2;
				dashboardLineChart.data.datasets[1].data = data_quality2;
				dashboardLineChart.data.datasets[1].label = label_quality2;
				dashboardLineChart.update();
				//handleRenderDashboardChart();
				break;
		case 2:	
				(document.getElementById("id-graphtitle")).innerHTML = 'Utilization <small> Last 24 hrs</small>';	
				dashboardLineChart.data.datasets[0].backgroundColor = color_utilization1;
				dashboardLineChart.data.datasets[0].borderColor = color_utilization_border1;
				dashboardLineChart.data.datasets[0].pointBackgroundColor = color_utilization_point1;
				dashboardLineChart.data.datasets[0].labels = labels_utilization;
				dashboardLineChart.data.datasets[0].data = data_utilization1;
				dashboardLineChart.data.datasets[0].label = label_utilization1;				
				dashboardLineChart.data.datasets[1].backgroundColor = color_utilization2;
				dashboardLineChart.data.datasets[1].borderColor = color_utilization_border2;
				dashboardLineChart.data.datasets[1].pointBackgroundColor = color_utilization_point2;
				dashboardLineChart.data.datasets[1].data = data_utilization2;
				dashboardLineChart.data.datasets[1].label = label_utilization2;
				dashboardLineChart.update();
				//handleRenderDashboardChart();
				break;
		case 3:	
				(document.getElementById("id-graphtitle")).innerHTML = 'OEE <small> Last 24 hrs</small>';	
				dashboardLineChart.data.datasets[0].backgroundColor = color_oee1;
				dashboardLineChart.data.datasets[0].borderColor = color_oee_border1;
				dashboardLineChart.data.datasets[0].pointBackgroundColor = color_oee_point1;
				dashboardLineChart.data.datasets[0].labels = labels_oee;
				dashboardLineChart.data.datasets[0].data = data_oee1;
				dashboardLineChart.data.datasets[0].label = label_oee1;	
				dashboardLineChart.data.datasets[1].backgroundColor = color_oee2;
				dashboardLineChart.data.datasets[1].borderColor = color_oee_border2;
				dashboardLineChart.data.datasets[1].pointBackgroundColor = color_oee_point2;
				dashboardLineChart.data.datasets[1].data = data_oee2;
				dashboardLineChart.data.datasets[1].label = label_oee2;
				dashboardLineChart.update();
				//handleRenderDashboardChart();
				break;
	}
}

var handleRenderDashboardChart = function() {
    var targetContainer = '#chart-dashboard-analytics';
    var targetHeight = ($(targetContainer).closest('.panel').hasClass('panel-expand')) ? $(targetContainer).closest('.panel-body').height() - 47 : $(targetContainer).attr('data-height');
    
    $(targetContainer).height(targetHeight);
    
    var ctx = document.getElementById('chart-dashboard-analytics').getContext('2d');
	
    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, 'rgba(62, 71, 79, 0.3)');
 
    dashboardLineChart = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
			responsive: true, 
			maintainAspectRatio: false,	
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
        }]
    };
    var data3 = {
        labels: ['Rejects', 'Good'],
        datasets: [{
            data: [100-goodper, goodper],
            backgroundColor: ['#3498DB', '#1F5F89'],
            borderColor: ['#fff', '#fff'],
            borderWidth: 2,
        }]
    };
    var data4 = {
        labels: ['Down', 'Up'],
        datasets: [{
            data: [100-83.33, 83.33],
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
            handleRenderDashboardChart();
		    handleDashboardGritterNotification();
		    handleWidgetReload();
		}
    };
}();