
var i, sample, data_min_x, data_max_x, data_min_y, data_max_y, data_min_org_x, data_max_org_x, data_min_org_y, data_max_org_y, average_x, average_y;
var theme=1, themecol='#ececec', axiscol="#ffffff", gridcol='#ffffff', backcol='#ffffff',txtcol='#000000', tittxtcol='#000000', grpcol='#0c87eb';
var empcellcol='#d2eafd', tabbrdcol='#ffffff', cellhedcol='#0c87eb', cellsameparacol='#6ec071';

//var data=[];
var data_x=[
104,96.1,101,100.5,99.5,99,97,102,100,103,
100,97.87,101,100.5,99.5,98,97,102,100,103,
100,100.1,101,100.5,99.5,99,97,102,100,103,
97.87,100.1,101,100.5,99.5,98,97,102,100,103,
97.87,100.1,101,95.5,99.5,99,97,102,100,103,
100,100.1,101,100.5,99.5,98,97,102,100,103,
100,100.1,101,100.5,99.5,98,97,102,100,103,
100,100.1,101,98.82,99.5,98,97,102,100,103,
98.82,100.1,101,100.5,99.5,98,97,102,100,103,
103.36,100.1,101,100.5,99.5,98,97,102,100,99.75,
];
var data_y=[
104,96.1,101,100.5,99.5,99,97,102,100,103,
100,97.87,101,100.5,99.5,98,97,102,100,103,
100,100.1,101,100.5,99.5,99,97,102,100,103,
97.87,100.1,101,100.5,99.5,98,97,102,100,103,
97.87,100.1,101,95.5,99.5,99,97,102,100,103,
100,100.1,101,100.5,99.5,98,97,102,100,103,
100,100.1,101,100.5,99.5,98,97,102,100,103,
100,100.1,101,98.82,99.5,98,97,102,100,103,
98.82,100.1,101,100.5,99.5,98,97,102,100,103,
103.36,100.1,101,100.5,99.5,98,97,102,100,99.75,
];


var row=[], cell=[], prevcellselected = null;
var pdsparaname=["Cycle time","Injection time","Inj start pos","Melt cush act","Melt cush min","Dosing time","Dosing pos","Switch over pos","Switch over prs","inj prs max",
                 "Mld cls time","Mld opn time","Mold pos","Oil temp","Fd zone temp","Zone 1 temp","Zone 2 temp","Zone 3 temp","Zone 4 temp","Zone 5 temp",
                 "Zone 6 temp","Nozzle 1 temp","Nozzle 2 temp","Melt temp","Mld lck fce","Ton bld time","Ton rel time","Eje fwd time","Eje ret time","Reserved"
                ];
var x_data_name, y_data_name;
var pdsvarno=30;
sample=100;

var c2 = document.getElementById('scatter');
var ctx2 = c2.getContext('2d');



window.addEventListener('load', loadCanvas, false);
window.addEventListener('resize', resizeCanvas, false);

function loadCanvas() 
{
	c2.width = $("#id-scatter-div").width();	
	calculate_statvalues();
	drawcorrelation();
	drawscatter();
}

function resizeCanvas() 
{	
	//c2.width=window.innerWidth;	
	c2.width=$("#id-scatter-div").width();	
	redraw_correlation();
}
function redraw_correlation() 
{
	calculate_statvalues();
	drawscatter();
}

function precisionRound(number, precision) 			//modified
{
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function paraselected(cellselected)
{	
	var i, j, bbreak=false;
	var table = document.getElementById("cortab");

	if (prevcellselected != null)
	{
		for(i=0;i<=pdsvarno;i++)
		{
			for(j=0;j<=pdsvarno;j++)
			{
				if(prevcellselected==row[i].cells[j])
				{			
					if (i != j)
					{
						prevcellselected.style.backgroundColor=themecol;	
						prevcellselected.style.color=txtcol;	
					}
					row[0].cells[j].style.backgroundColor="#0c87eb";
					row[i].cells[0].style.backgroundColor="#0c87eb";
					break;
				}
			}
		}
	}
		
	for(i=0;i<=pdsvarno;i++)
	{
		for(j=0;j<=pdsvarno;j++)
		{
			if(cellselected==row[i].cells[j])
			{		
				if (i != j)
				{
					cellselected.style.backgroundColor="#074b83";
					cellselected.style.color="white";	
				}
				row[0].cells[j].style.backgroundColor="#074b83";
				row[i].cells[0].style.backgroundColor="#074b83";
				x_data_name=pdsparaname[j-1];
				y_data_name=pdsparaname[i-1];
				drawscatter();
				break;
			}
		}
	}
	prevcellselected = cellselected;
}

//**********CALCULATE STATISTICAL VALUES**********//
function calculate_statvalues()
{
	var range;
	data_max_org_x=data_max_org_y=0; 
	data_min_org_x=data_min_org_y=99999999999; 
	average_x = average_y=0;
	
	for (i=0;i<sample;i++)
	{
		if(data_x[i]>data_max_org_x)
		{
			data_max_org_x=data_x[i];
		}
		if(data_x[i]<data_min_org_x)
		{
			data_min_org_x=data_x[i];
		}	
		average_x+=data_x[i]; 
	}
	for (i=0;i<sample;i++)
	{
		if(data_y[i]>data_max_org_y)
		{
			data_max_org_y=data_y[i];
		}
		if(data_y[i]<data_min_org_y)
		{
			data_min_org_y=data_y[i];
		}	
		average_y+=data_y[i]; 
	}

	average_x/=sample;
	average_y/=sample;
	range = (data_max_org_x-data_min_org_x);
	data_max_x=average_x+range;
	data_min_x=average_x-range;
	range = (data_max_org_y-data_min_org_y);
	data_max_y=average_y+range;
	data_min_y=average_y-range;
}

function calculate_correlation()
{
	var i, sumx=0, sumy=0, sumxy=0, sumxsqr=0, sumysqr=0, numerator=0, denominator=0, r=0;
	for (i=0;i<sample;i++)
	{
		sumx  	+=	data_x[i];
		sumy  	+= 	data_y[i];
		sumxy 	+= 	(data_x[i]*data_y[i]);
		sumxsqr	+= 	(data_x[i]*data_x[i]);
		sumysqr	+= 	(data_y[i]*data_y[i]);
	}
	numerator	=	(sample*sumxy)-(sumx*sumy);
	denominator	=	Math.sqrt(((sample*sumxsqr)-(sumx*sumx))*((sample*sumysqr)-(sumy*sumy)));	
	r			=	numerator/denominator;
}

//**********CORRELATION TABLE**********//
function drawcorrelation() 
{	
	var i, j;
	var table = document.getElementById("cortab");

	for(i=0;i<=pdsvarno;i++)
	{
		row[i] = table.insertRow(i);
		for(j=0;j<=pdsvarno;j++)
		{
			cell[j] = row[i].insertCell(j);
			row[i].cells[j].style.border='1px solid'+tabbrdcol;
			if (i==0 && j==0)
			{
				row[i].cells[j].style.backgroundColor = backcol;	
				row[i].cells[j].style.color="#0c87eb";					
				row[i].cells[j].innerHTML="Parameters";
			}			
			else if (i==0 && j>0)
			{
				row[i].cells[j].style.backgroundColor = cellhedcol;
				row[i].cells[j].style.color="white";	
				row[i].cells[j].innerHTML=pdsparaname[j-1];
			}			
			else if (i>0 && j==0)
			{
				row[i].cells[j].style.backgroundColor = cellhedcol;
				row[i].cells[j].style.color="white";	
				row[i].cells[j].innerHTML=pdsparaname[i-1];
			}	
			else if (i==j)
			{
				row[i].cells[j].style.backgroundColor = cellsameparacol;
				row[i].cells[j].style.color="white";	
				row[i].cells[j].innerHTML="1 . 000";
				row[i].cells[j].onclick = function(){paraselected(this);};
			}
			else if (j<i)
			{
				row[i].cells[j].style.backgroundColor = themecol;
				row[i].cells[j].style.color = txtcol;
				//row[i].cells[j].innerHTML=i+""+j;
				row[i].cells[j].onclick = function(){paraselected(this);};
			}
			else
			{
				row[i].cells[j].style.backgroundColor = empcellcol;
			}
		}
	}
}

//**********SCATTER CHART**********//
function drawscatter() 
{	
	var i,j,k,x,y,w,h,x_div_no, y_div_no,x_div,y_div, x_max, x_div_val,y_div_val, x_div_val1;
	var data_hist=[], data_hist_max;
	var x1,y1,w1,h1;
		
	x=c2.width*0.05; y=c2.height*0.05; w=c2.width-c2.width*0.08; h=c2.height-c2.height*0.13-20; x_div_no=10; y_div_no=10; x_div=w/x_div_no; y_div=h/y_div_no;
	data_hist_max=0;
	
	x=80;
	w=c2.width-125;
	x_div_no=20/1600*c2.width;
	x_div_no=precisionRound(x_div_no, 0);
	if (x_div_no>20)
	{
		x_div_no=20;
	}
	x_div=w/x_div_no;
	
	ctx2.setTransform(1, 0, 0, 1, 0, 0);
	ctx2.clearRect(0, 0, c2.width, c2.height);
	ctx2.restore();

	ctx2.beginPath();
	ctx2.fillStyle = backcol;
	ctx2.fillRect(0,0,c2.width,c2.height);
	
	ctx2.fillStyle = themecol;
	ctx2.fillRect(x,y,w,h);

	ctx2.strokeStyle = gridcol;
	ctx2.font = "12px Verdana";
	ctx2.fillStyle = txtcol;

	for (i=0;i<=x_div_no;i++)
	{
		ctx2.moveTo(x+x_div*i, y);
		ctx2.lineTo(x+x_div*i,y+h);				
		x_div_val=(data_max_x-data_min_x)/x_div_no*i+data_min_x;
		x_div_val=precisionRound(x_div_val, 2);	
		ctx2.fillText(x_div_val, x+x_div*i-10, y+h+15);
	}
	ctx2.stroke();	
	
	ctx2.textAlign="right"; 
	for (i=0;i<=y_div_no;i++)
	{
		ctx2.moveTo(x, y+h-y_div*i);
		ctx2.lineTo(x+w,y+h-y_div*i);						
		y_div_val=(data_max_y-data_min_y)/y_div_no*i+data_min_y;
		y_div_val=precisionRound(y_div_val, 2);	
		ctx2.fillText(y_div_val, x-5, y+h-y_div*i+2);
	}
	ctx2.stroke();		
	
	for (i=0;i<sample;i++)
	{
		ctx2.beginPath();
		x1=(data_x[i]-data_min_x)/(data_max_x-data_min_x)*(w)+(x);		
		y1=(y+h)-(data_y[i]-data_min_y)/(data_max_y-data_min_y)*(h);			
		ctx2.arc(x1, y1, 2.5, 0, 2 * Math.PI);
		ctx2.fillStyle = grpcol;
		ctx2.fill();
	}

	ctx2.beginPath();
	ctx2.fillStyle = tittxtcol;
	ctx2.font = "bold 16px Verdana";
	ctx2.textAlign = "right";	
	ctx2.fillText("Scatter Chart", x+w, y+h-330);
	
	ctx2.beginPath();
	ctx2.fillStyle = grpcol;
	ctx2.font = "bold 14px Verdana";
	ctx2.textAlign = "right";	
	ctx2.fillText(x_data_name, x+w/2, y+h+40);
	
	ctx2.beginPath();
	ctx2.fillStyle = grpcol;
	ctx2.font = "bold 14px Verdana";
	ctx2.textAlign = "center";	
	ctx2.rotate(270*Math.PI/180);
	ctx2.fillText(y_data_name, x-250, y+h-340);
	//ctx2.fillText(y_data_name, x-30, y+h-150);
	
}


