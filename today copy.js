// JavaScript Document

var x1;
var x2;
var canvasA;
var cxa;
var FPS = 30;

var initYes = 0;
var beginYes = 0;
var rollOver = 0;
var beginAlpha = 100;
var newFrame = 1;
var backFrame = 0;

var endCount = 500;
var buttonLock = 0;

// DRAWING CONSTANTS //
var noiseImg = new Image();
noiseImg.src = 'spatter.gif';

var copyColor = "#FFF";
var bgColor = "#101317";
var bgColor2 = "#101317";
var greyColor = "#24282d";
var greyColor2 = "#707377";
var greyColor3 = "#505357";
var greyPurpleColor = "#473353";

var tenthX = 0;
var tenthY = 0;
var halfX = 0;
var halfY = 0;
var thirdX = 0;
var thirdY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;

var headerType = 40;
var midType = 26;
var bodyType = 12;
var marginUp = 0;
var marginDown = 0;

// DATE STUFF //

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
var thisDate = new Date();
var thisYear = '';
var thisMonth = '';
var today = '';

// FRAME VARS //

var colors = ['#e0ce00','#ff6600','#24282d','#ff2244','#550033','#0099ff','#003355','#00a172','#a800ff','#00d2ff','#7e00ff','#ee2b2b','#960058','#e6003c','#eb3700','#ff9702','#f6ff02'
//////        0-yellow  1-orange  2-grey    3-rose   4-r/purple  5-cyan    6-d/blue 7-b/green  8-purple 9-cyan2  10-purple2 11-red     12-mage  13-red  14-d/orange 15-amber  16-yellow
,'#feb300','#cb1831','#6e1160','#2a0f6f','#1aecae','#91ec1a','#555'];
//17-lemon 18-red    19-plum   20-dark elf 21-life 22-okidation 23-todaysmall

var focusCol = colors[0];
var lastCol = colors[0];


var frame = 0;
var lastFrame = -1;
var epochPhase = 1;
var eraWidth = 0;

var headerTxt = ['HERE IS TODAY','HERE IS THIS MONTH','HERE IS THIS YEAR','HERE IS THIS CENTURY','here is INDUSTRIALIZATION','here is AGRICULTURE','HERE IS THIS MILLENNIUM','HERE IS THIS EPOCH','HERE IS THIS PERIOD','HERE IS THIS ERA','HERE IS THIS EON','HERE IS THE EARTH','HERE IS LIFE','HERE IS OXIDATION','HERE ARE FISH','HERE ARE INSECTS','HERE ARE REPTILES','HERE ARE MAMMALS','HERE ARE BIRDS','HERE ARE HUMANS','HERE IS THE UNIVERSE',''];
var blurbTxt = [];

var frameFunction = [draw0,draw1,draw2,draw3,draw3_5,draw3_6,draw4,draw5,draw6,draw7,draw8,draw9,draw10,draw11,draw12,draw13,draw14,draw15,draw16,draw17,draw18];

var tweenSpeed = 10;

// x-position of beginning of time period 
var shapeX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var shapeY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// length of time period on bar 
var shapeW = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var shapeH = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var shapeA = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var destX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var destY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var destW = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var destH = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var destA = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var y1 = "0";
var y2 = "0";
var h1 = "0";
var h2 = "0";
var desty1 = "0";
var desty2 = "0";
var desth1 = "0";
var desth2 = "0";
var bgx = "0";
var bgw = "0";
var destbgx = "0";
var destbgw = "0"; // fix these?
var dateA = 0;
var destDateA = 0;

// COMETS //
var cometNo = 2;
var cometActive = [0,0,0,0,0,0];
var cometX = [100,400,500,0,0,0];
var cometY = [-10,-10,-10,-10,-10,-10];
var cometCount = [360,405,420,300,400,100];
var redCount = -200;
var purpleCount = 0;
var redAlpha = 0;
var purpleAlpha = 0;

// ROLLOVERS //
var backOver = false;
var okOver = false;
var wvOver = false;



function init() {

	////////////// SETUP CANVAS ////////////

	canvasA = document.getElementById("layerA");

	if (canvasA.addEventListener){
	  canvasA.addEventListener("mousedown", getPosition, false);
	  canvasA.addEventListener("mousemove", mouseMove, false);
	} else if (canvasA.attachEvent){
	  canvasA.attachEvent("mousedown", getPosition);
	  canvasA.attachEvent("mousemove", mouseMove);
	}

    cxa = canvasA.getContext("2d");
	initYes = 1;


	// SET CANVAS & DRAWING POSITIONS //
	resize_canvas();

	// GET DATE //
	thisYear = ""+thisDate.getFullYear();
	thisMonth = ""+months[thisDate.getMonth()];
	today = ""+days[thisDate.getDay()]+", "+ thisMonth + " " + thisDate.getDate();
	blurbTxt = [today,thisMonth,thisYear,'21st Century', '18th century GB?', 'dev. during interglacial','3rd Millennium', 'Holocene - the current epoch of the geologic time scale','Quaternary - the current period of the geologic time scale','Cenozoic - the current era of the geologic time scale','Phanerozoic - the current eon of the geologic time scale','A volatile formation about 4.6 billion years ago','Simple cell life forms appeared about 3.6 billion years ago','Photosynthesis generates an oxygen atmosphere','Fish and proto-amphibians start to fill the waters','Insects and vegetation start to flourish','Reptiles rise from the water and dominate the land','Small mammals appear alongside the dinosaurs','Early birds evolve in the Jurassic period','Homo sapiens reaches anatomical modernity','...','','',''];



	y1 = desty1 = halfY-units;
	h1 = desth1 = units*2;


} // END INIT



setInterval(function() {
	if (initYes==1&&beginYes==0) {
		update();
		beginDraw();
		if (frame==9) {
	        comets();
			flashes();
	    }
		if (endCount<90) {
			endFrame();
		}

	} else if (initYes==1&&beginYes==2) {

		draw();
		noiseDraw();
	}


}, 1000/FPS);

// END INTERVAL



function update() {

	//////   TWEEN SHAPES    //////

	for (i=0;i<shapeX.length;i++) {

		destX[i] = Math.round(destX[i]);
		destW[i] = Math.round(destW[i]);

		if (destW[i]<1) {
			destW[i] = 1;
		}


		shapeX[i] += ((destX[i]-shapeX[i])/100)*(tweenSpeed*1.5);
		shapeY[i] += ((destY[i]-shapeY[i])/100)*tweenSpeed;
		shapeW[i] += ((destW[i]-shapeW[i])/100)*tweenSpeed;
		shapeH[i] += ((destH[i]-shapeH[i])/100)*tweenSpeed;
		shapeA[i] += ((destA[i]-shapeA[i])/100)*(tweenSpeed*0.5);
	}


	y1 += ((desty1-y1)/100)*tweenSpeed;
	h1 += ((desth1-h1)/100)*tweenSpeed;
	y2 += ((desty2-y2)/100)*tweenSpeed;
	h2 += ((desth2-h2)/100)*tweenSpeed;

	dateA += ((destDateA-dateA)/100)*tweenSpeed;


} /////   END UPDATE


function draw() {

} // END DRAW


//////////////////////////////////   START DRAWING   ///////////////////////////////


function beginDraw() {

	    cxa.globalAlpha = 1;

		// BG //

		cxa.fillStyle = "#202327";
		cxa.fillStyle = bgColor2;
		//cxa.fillStyle = colors[0];
		cxa.fillRect(0,0,canvasA.width,canvasA.height);

		drawSpatter();

		cxa.globalAlpha = 1;
		cxa.textAlign = 'right';
		// TEST //
		/*cxa.fillStyle = copyColor;
		cxa.font = "20px PT Sans";
		cxa.fillText(frame, 50, 50);*/
		// wvn //



		if (wvOver==true) {
			cxa.fillStyle = "#fff";
			cxa.beginPath();
			cxa.moveTo(fullX-(units*0.5),fullY-(units*0.4));
			cxa.lineTo(fullX-(units*1.5),fullY-(units*0.4));
			cxa.stroke();
		} else {
			cxa.fillStyle = "#777";
		}
		cxa.font = subType+"px PT Sans";
		cxa.fillText('By Whitevinyl', (fullX-(units*0.5))-1, fullY-(units*0.5));
		/// GRAPHIC FUNCTION ///
		cxa.textAlign = 'center';
		frameFunction[frame]();

		/// SETUP ///

		cxa.globalAlpha = 1;
		cxa.fillStyle = copyColor;
		cxa.strokeStyle = copyColor;
		cxa.lineWidth = 1;
	    cxa.textAlign = 'center';



		///HEADER ///

		cxa.font = "bold "+headerType+"px PT Sans";
		cxa.fillText(headerTxt[frame], halfX, halfY-(units*3));
		headerWidth = (cxa.measureText(headerTxt[frame]).width)/2;


		/// ARROW ///

		arrowX = shapeX[0]+(shapeW[0]/2);

		if (frame==0) {
			cxa.beginPath();
			cxa.moveTo(arrowX-(units/2),halfY-(units*2.2));
			cxa.lineTo(arrowX+(units/2),halfY-(units*2.2));
			cxa.lineTo(arrowX,halfY-(units*1.5));
			cxa.lineTo(arrowX-(units/2),halfY-(units*2.2));
			cxa.closePath();
			cxa.fill();
		} else {

			cxa.beginPath();
			cxa.moveTo(arrowX-(units/3),halfY-(units*1.4));
			cxa.lineTo(arrowX+(units/3),halfY-(units*1.4));
			cxa.lineTo(arrowX,halfY-(units*1.1));
			cxa.lineTo(arrowX-(units/3),halfY-(units*1.4));
			cxa.closePath();
			cxa.fill();

			cxa.fillStyle = copyColor;
			cxa.font = bodyType+"px PT Sans";
			cxa.fillText("Today", arrowX, halfY-(units*1.6));
		}


		/// COPY ///

		cxa.fillStyle = copyColor;
		cxa.font = bodyType+"px PT Sans";

		if (frame<5) {
		    cxa.fillText(blurbTxt[frame], halfX, halfY+(units*1.8));
		} else {
			cxa.fillText(blurbTxt[frame], halfX, halfY-(units*2));
			cxa.font = "italic " + bodyType+"px PT Sans";
			if (frame<9) {
			    cxa.fillText("(geology)", halfX, halfY-(units*2.6));
			}
		}

		/// LINE ///

		cxa.beginPath();
		cxa.moveTo(halfX-headerWidth,halfY+(units*3));
		cxa.lineTo(halfX+headerWidth,halfY+(units*3));
		cxa.stroke();




		/// CTA ///

		if (frame>0) {
			cxa.font = "italic "+midType+"px georgia";
			cxa.fillText("- back | Okay +", halfX+(units*0.15), halfY+(units*4.5));

			if (backOver==true) {

			cxa.beginPath();
			cxa.moveTo(halfX-(units*1.4),halfY+(units*4.8));
			cxa.lineTo(halfX-(units*0.3),halfY+(units*4.8));
			cxa.stroke();
			} else {

			cxa.beginPath();
			cxa.moveTo(halfX+(units*0.3),halfY+(units*4.8));
			cxa.lineTo(halfX+(units*1.5),halfY+(units*4.8));
			cxa.stroke();
			}

		} else {
			cxa.font = "italic "+midType+"px georgia";
		    cxa.fillText("Okay +", halfX, halfY+(units*4.5));

			if (okOver==true) {

			cxa.beginPath();
			cxa.moveTo(halfX-(units),halfY+(units*4.8));
			cxa.lineTo(halfX+(units),halfY+(units*4.8));
			cxa.stroke();
			}

		}


		/// FADE IN ///

		if (beginAlpha>0) {
			cxa.globalAlpha = beginAlpha/100;
			cxa.fillStyle = bgColor;
			cxa.fillRect(0,0,canvasA.width,canvasA.height);
			beginAlpha -= 2;
		}



}

function resize_canvas() {

	//if (canvasA.width  < window.innerWidth) {
		canvasA.width  = window.innerWidth;
	//}
	//if (canvasA.height < window.innerHeight) {
		canvasA.height = window.innerHeight;
	//}


	units = Math.round(canvasA.width/22);
	tenthX = Math.round(canvasA.width/10);
	tenthY = Math.round(canvasA.height/10);
	halfX = Math.round(canvasA.width/2);
	halfY = Math.round(canvasA.height/2);
	thirdX = Math.round(canvasA.width/3);
	thirdY = Math.round(canvasA.height/3);
	fullX = canvasA.width;
	fullY = canvasA.height;
	headerType = Math.round(canvasA.width/24);
	midType = Math.round(canvasA.width/40);
	bodyType = Math.round(canvasA.width/90);
	subType = Math.round(canvasA.width/130);

	if (headerType<30) {
		headerType = 30;
	}
	if (midType<17) {
		midType = 17;
	}
	if (bodyType<11) {
		bodyType = 11;
	}
	if (subType<6) {
		subType = 6;
	}
	if (units<30) {
		units = 30;
	}

	marginUp = bodyType*2;
	marginDown = bodyType*3;

	y1 = desty1 = halfY-units;
	h1 = desth1 = units*2;
	bgx = destbgx = units*2;
	bgw = destbgw = fullX-(units*4);


}

function comets() {


	for (i=0;i<cometNo;i++) {
		sunit = units*0.03;
		lunit = units*7;

		if (cometCount[i]>500 && cometActive[i]==0 && frame<10 && frame>7) { // BEGIN
			cometActive[i] = 1;
			cometY[i] = -10;
			cometX[i] = 100 + (Math.random()*fullX);
		}

		if (cometY[i]>(fullY+(lunit*2))) { // END
			cometActive[i] = 0;
			//cometX[i] = 400;
			cometY[i] = -10;

			cometCount[i] = 350 + Math.round(Math.random()*140);
		}

		if (cometActive[i]==1) { // MOVE
			cometX[i] -= 60;
			cometY[i] += 60;


			// DRAWING //
			cxa.globalAlpha = 0.2;
			cxa.fillStyle = '#FED';
			cxa.beginPath();
			cxa.moveTo(cometX[i]-sunit,cometY[i]+sunit);
			cxa.lineTo(cometX[i]-sunit,cometY[i]-sunit);
			cxa.lineTo(cometX[i]+lunit,cometY[i]-lunit);
			cxa.lineTo(cometX[i]+sunit,cometY[i]+sunit);
			cxa.lineTo(cometX[i]-sunit,cometY[i]+sunit);
			cxa.closePath();
			cxa.fill();

			cxa.globalAlpha = 0.1;
			cxa.beginPath();
			cxa.moveTo(cometX[i]-sunit,cometY[i]+sunit);
			cxa.lineTo(cometX[i]-sunit,cometY[i]-sunit);
			cxa.lineTo(cometX[i]+(lunit*1.8),cometY[i]-(lunit*1.8));
			cxa.lineTo(cometX[i]+sunit,cometY[i]+sunit);
			cxa.lineTo(cometX[i]-sunit,cometY[i]+sunit);
			cxa.closePath();
			cxa.fill();

			cxa.globalAlpha = 1;
			cxa.fillStyle = '#F99';
			cxa.beginPath();
			cxa.arc(cometX[i], cometY[i], units*0.04, 0, 2 * Math.PI, false);
			cxa.closePath();
			cxa.fill();
		}


		cometCount[i] += 1;



	}

}

function flashes() {

	if (frame==9) {
		if (redCount>150) {
			redAlpha = 10;
			redCount = Math.round(Math.random()*100);
		}
		if (purpleCount>200) {
			purpleAlpha = 20;
			purpleCount = Math.round(Math.random()*150);
		}
	} else {
		if (redCount>500) {
			redAlpha = 5;
			redCount = Math.round(Math.random()*300);
		}
		if (purpleCount>700) {
			purpleAlpha = 20;
			purpleCount = Math.round(Math.random()*300);
		}
	}

	redCount += 1;
	purpleCount += 1;

	if (redAlpha>0) {
		redAlpha -= 1;
	}
	if (purpleAlpha>0) {
		purpleAlpha -= 0.5;
	}

	////// DRAWING ///////
		//if (frame>6 && frame<11) {
			cxa.globalAlpha = redAlpha/100;
			cxa.fillStyle = colors[3];
		    cxa.fillRect(0,0,canvasA.width,canvasA.height);
			cxa.globalAlpha = purpleAlpha/100;
			cxa.fillStyle = colors[4];
			cxa.fillRect(0,0,canvasA.width,canvasA.height);
		//}
}


//////////////////////////////  MOUSE FUNCTIONS ////////////////////////////////

function setRollover() {
	rollOver = 1;
}

function setRollout() {
	rollOver = 0;
}

function mouseMove(event) {
	var canvas = document.getElementById("layerA");

	var x = new Number();
	var y = new Number();
	var canvas = document.getElementById("layerA");

	if (event.x != undefined && event.y != undefined)
	{
	  x = event.x;
	  y = event.y;
	}
	else // Firefox method to get the position
	{
	  x = event.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = event.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}

    var mox = x;
	var moy = y;
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	//alert("mouseMove x="+mox);

	if (frame>0) {
		okOver = rollCheck(halfX,halfY+(units*3.8),units*2.4,units*1,mox,moy);
	    backOver = rollCheck(halfX-(units*2.4),halfY+(units*3.8),units*2.4,units*1,mox,moy);
	} else {
		backOver = false;
		okOver = rollCheck(halfX-(units*1.2),halfY+(units*3.8),units*2.4,units*1,mox,moy);
	}
	wvOver = rollCheck(fullX-(units*1.7),fullY-(units*0.8),units*1.7,units*0.8,mox,moy);
}

function rollCheck(b,c,d,e,f,g) {



	if (f>b && f<(b+d) && g>c && g<(c+e)) {
		return true;
		//alert("...");
	} else {return false};

}


function getPosition(event) {





	var x = new Number();
	var y = new Number();
	var canvas = document.getElementById("layerA");

	if (event.x != undefined && event.y != undefined)
	{
	  x = event.x;
	  y = event.y;
	}
	else // Firefox method to get the position
	{
	  x = event.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = event.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}

    var mox = x;
	var moy = y;
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;


	if (frame>0) {
		okOver = rollCheck(halfX,halfY+(units*3.8),units*2.4,units*1,mox,moy);
	    backOver = rollCheck(halfX-(units*2.4),halfY+(units*3.8),units*2.4,units*1,mox,moy);
	} else {
		backOver = false;
		okOver = rollCheck(halfX-(units*1.2),halfY+(units*3.8),units*2.4,units*1,mox,moy);
	}

	wvOver = rollCheck(fullX-(units*1.7),fullY-(units*0.8),units*1.7,units*0.8,mox,moy);



	//x-= 20;
	//y-= 20;

	//lastFrame = frame;

	if (buttonLock!==1) {

		if (backOver==true) {
			backFrame = 1;
			frame -= 1;
		} else if (wvOver==true) {
			window.location = "http://whitevinyldesign.com/";
			//window.open("http://whitevinyldesign.com","_blank");
		}else {
			if (frame!==18) {
			newFrame = 1;
			frame += 1;
			}
			else {
			buttonLock = 1;
			endCount = 0;
			}
		}
	}



}

///////////////// MARKERS ////////////////////

function topMarker (mx,ma,mstring,mcolor) {

	cxa.globalAlpha = ma;
	cxa.fillStyle = mcolor;
	cxa.beginPath();
	cxa.moveTo(mx-(units/6),halfY-(units*1.25));
	cxa.lineTo(mx+(units/6),halfY-(units*1.25));
	cxa.lineTo(mx,halfY-(units*1.1));
	cxa.lineTo(mx-(units/6),halfY-(units*1.25));
	cxa.closePath();
	cxa.fill();
	cxa.font = subType+"px PT Sans";
	cxa.fillStyle = copyColor;
	cxa.fillText(mstring, mx, halfY-(units*1.4));

}
function baseMarker2 (mx,ma,mstring,mcolor) {

	dy = y2+h2;

	cxa.globalAlpha = ma;
	cxa.fillStyle = mcolor;
	cxa.beginPath();
	cxa.moveTo(mx-(units/6),dy+(units*0.25));
	cxa.lineTo(mx+(units/6),dy+(units*0.25));
	cxa.lineTo(mx,dy+(units*0.1));
	cxa.lineTo(mx-(units/6),dy+(units*0.25));
	cxa.closePath();
	cxa.fill();
	cxa.font = subType+"px PT Sans";
	cxa.fillStyle = copyColor;
	cxa.fillText(mstring, mx, dy+(units*0.5));

}

function baseMarker(mx,ma,mstring,mcolor) {

	dy = y1+h1;

    cxa.globalAlpha = ma;
    cxa.fillStyle = mcolor;
	cxa.beginPath();
	cxa.moveTo(mx-(units*0.15),dy);
	cxa.lineTo(mx,dy-(units*0.15));
	cxa.lineTo(mx+(units*0.15),dy);
	cxa.lineTo(mx,dy+(units*0.15));
	cxa.lineTo(mx-(units*0.15),dy);
	cxa.closePath();
	cxa.fill();
	cxa.font = subType+"px PT Sans";
	cxa.fillStyle = copyColor;

	cxa.textAlign = 'right';
	cxa.save();
	cxa.translate(mx,dy+(units*0.3));
	cxa.rotate(-Math.PI/3);
	cxa.fillText(mstring, 0, 0);
	cxa.restore();
	cxa.textAlign = 'center';

}

function drawSpatter() {

	//if (noiseimg==undefined) {
		//var noiseImg = new Image();
		//noiseImg.src = 'spatter.gif';
	//}
    cxa.globalAlpha = 0.45;

	iw = Math.round(fullX*0.4);
	ih = Math.round(fullX*0.35);


	cxa.drawImage(noiseImg,0,0,iw,ih);
	cxa.drawImage(noiseImg,iw,0,iw,ih);
	cxa.drawImage(noiseImg,iw*2,0,iw,ih);

}

//////////////////////////////////////   FRAME FUNCTIONS ///////////////////////////////////////

function draw0() {

	if (lastFrame<frame) { // FWD
		shapeX[0] = halfX-units;
	    shapeW[0] = units*2;
	}
	if (lastFrame>frame) { // BK
		shapeA[0] = 1;
	}
	lastFrame = frame;

	tweenSpeed = 10;

	destX[0] = halfX-units;
	destW[0] = units*2;
	destA[0] = 1;
	destA[1] = 0;


	/// GREY ///
	cxa.globalAlpha = shapeA[1];
	cxa.fillStyle = colors[2];
	cxa.fillRect(bgx,y1,bgw,h1);

	/// MONTH ///
	future = shapeX[0]-shapeX[1];
	cxa.globalAlpha = shapeA[1];
	cxa.fillStyle = colors[1];
	cxa.fillRect(shapeX[1],y1,future,h1);

	// DAY //
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);


}

function draw1() { // MONTH

	if (lastFrame<frame) { // FWD
		shapeX[1]  = bgx;
	    shapeW[1] =  bgw;
		shapeA[2] = destA[2] = 0;

	}
	if (lastFrame>frame) { // BK
	    monthWidth = bgw/12;
		shapeX[1] = bgx+(thisDate.getMonth()*monthWidth);
		shapeW[1] = monthWidth;
		dayWidth = shapeW[1]/(monthDays[thisDate.getMonth()]);
		shapeX[0] = shapeX[1]+((thisDate.getDate()-1)*dayWidth);
		shapeW[0] = dayWidth;
	}
	lastFrame = frame;

	destX[1] = bgx;
	destW[1] = bgw;
	destA[1] = 1;
	destA[2] = 0;

	var dayWidth = shapeW[1]/(monthDays[thisDate.getMonth()]);
	destX[0] = shapeX[1]+((thisDate.getDate()-1)*dayWidth);
	destW[0] = dayWidth;

	/// GREY ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[4];
	cxa.fillRect(bgx,y1,bgw,h1);

	/// YEAR ///
	future = shapeX[1]-shapeX[2];
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3];
	cxa.fillRect(shapeX[2],y1,future,h1);


	/// GREY ///
	cxa.globalAlpha = shapeA[1];
	cxa.fillStyle = colors[2];
	cxa.fillRect(shapeX[1],y1,shapeW[1],h1);


	/// MONTH ///
	future = shapeX[0]-shapeX[1];
	cxa.globalAlpha = shapeA[1];
	cxa.fillStyle = colors[1];
	cxa.fillRect(shapeX[1],y1,future,h1);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);
}
function draw2() { // YEAR

	if (lastFrame<frame) { // FWD
		shapeX[2] = bgx;
		shapeW[2] = bgw;
		destA[2] = 1;
	}
	if (lastFrame>frame) { // BK
		destA[3] = 0;
		yearWidth = bgw/100;
		destX[2] = bgx+((thisDate.getFullYear()-2000)*yearWidth);
		destW[2] = yearWidth;
	}
	lastFrame = frame;

	destX[2] = bgx;
	destW[2] = bgw;


	var monthWidth = bgw/12;
	destX[1] = bgx+(thisDate.getMonth()*monthWidth);
	destW[1] = monthWidth;


	var dayWidth = shapeW[1]/(monthDays[thisDate.getMonth()]);
	shapeX[0] = shapeX[1]+((thisDate.getDate()-1)*dayWidth);
	destW[0] = dayWidth;


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// GREY ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[6];
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// CENTURY ///
	future = shapeX[2]-shapeX[3];
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[5];
	cxa.fillRect(shapeX[3],y1,future,h1);

	/// GREY ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[4];
	cxa.fillRect(shapeX[2],y1,shapeW[2],h1);

	/// YEAR ///
	future = shapeX[1]-shapeX[2];
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3];
	cxa.fillRect(shapeX[2],y1,future,h1);

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[2];
	cxa.fillRect(shapeX[1],y1,shapeW[1],h1);

	/// MONTH ///
	future = shapeX[0]-shapeX[1];
	cxa.globalAlpha = shapeA[1];
	cxa.fillStyle = colors[1];
	cxa.fillRect(shapeX[1],y1,future,h1);
	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);
}
function draw3() { // CENTURY

	if (lastFrame<frame) { // FWD
		shapeX[3] = bgx;
		shapeW[3] = bgw;
		destA[3] = 1;
	}
	if (lastFrame>frame) { // BK
		centuryWidth = bgw/10;
		destX[3] = bgx;
		destW[3] = centuryWidth;

		yearWidth = shapeW[3]/100;
		shapeX[2] = bgx+((thisDate.getFullYear()-2000)*yearWidth);
		shapeW[2] = yearWidth;

		monthWidth = shapeW[2]/12;
	    shapeX[1] = shapeX[2]+(thisDate.getMonth()*monthWidth);
	    shapeW[1] = monthWidth;

		dayWidth = shapeW[1]/monthDays[thisDate.getMonth()];
	    shapeX[0] = shapeX[1]+(thisDate.getDate()*dayWidth);
	    shapeW[0] = dayWidth;

		tweenSpeed = 10;
	}
	lastFrame = frame;

	shapeX[3] = destX[3] = bgx;
	destW[3] = bgw;


	var yearWidth = shapeW[3]/100;
	destX[2] = bgx+((thisDate.getFullYear()-2000)*yearWidth);
	destW[2] = yearWidth;

	var monthWidth = shapeW[2]/12;
	shapeX[1] = shapeX[2]+(thisDate.getMonth()*monthWidth);
	destW[1] = monthWidth;


	var dayWidth = shapeW[1]/monthDays[thisDate.getMonth()];
	shapeX[0] = shapeX[1]+(thisDate.getDate()*dayWidth);
	destW[0] = dayWidth;


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// FUTURE CENTURY ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[6]; // dark blue
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// PAST CENTURY ///
	future = shapeX[2]-shapeX[3];
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[5]; // light blue (cyan)
	cxa.fillRect(shapeX[3],y1,future,h1);

	/// FUTURE YEAR ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[4]; // purple (latter half of year)
	cxa.fillRect(shapeX[2],y1,shapeW[2],h1);

	/// PAST YEAR ///
	future = shapeX[0]-shapeX[2];
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3]; // red
	cxa.fillRect(shapeX[2],y1,future,h1);

	if (shapeW[1]>(units/35)) {
		/// GREY ///
		cxa.globalAlpha = 1;
		cxa.fillStyle = colors[2]; //dark grey (millenium)
		cxa.fillRect(shapeX[1],y1,shapeW[1],h1);

		/// MONTH ///
		future = shapeX[0]-shapeX[1];
		cxa.globalAlpha = shapeA[1]; // orange
		cxa.fillStyle = colors[1];
		cxa.fillRect(shapeX[1],y1,future,h1);
	}

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);
}

function draw3_5(){ // // INDUSTRIALIZATION /////////
	// section necessary for keeping "today" section intact when traveling backward from here
	if (lastFrame<frame) { // FWD
		shapeX[0] = shapeX[1] = shapeX[2] = shapeX[3] = bgx;
		shapeX[4] = bgx;
		shapeW[4] = bgw;
		tweenSpeed = 10;
		

	}
	if (lastFrame>frame) { // BK
		shapeW[4] = destW[4] = (bgw/1000)*(thisDate.getFullYear()-2000);
		destA[0] = 1;
		tweenSpeed = 7;
		
	}
	lastFrame = frame;

	
	destA[7] = 0;
	destA[6] = 0;
	destA[5] = 0;


	// industrialization = whole bar
	destX[4] = bgx;
	destW[4] = bgw;

	var industrialWidth = bgw;
	industrialX = bgx;

	// SET THE NEW PROPERTIES //

	var centuryWidth = shapeW[4]/2.94; // 1000/340 = 2.94
	destX[3] = shapeX[3] = shapeX[4]; // starting from the left edge
	
	destW[3] = centuryWidth;

	var OFFSET = bgw - centuryWidth;
	shapeX[3] += OFFSET;
	
	var yearWidth = shapeW[3]/100;
	shapeX[2] = shapeX[3]+((thisDate.getFullYear()-2000)*yearWidth);
	destW[2] = yearWidth;

	var monthWidth = shapeW[2]/12;
	shapeX[1] = shapeX[2]+(thisDate.getMonth()*monthWidth); // position that month begins
	destW[1] = monthWidth; //length of month


	var dayWidth = shapeW[1]/monthDays[thisDate.getMonth()];
	shapeX[0] = shapeX[1]+(thisDate.getDate()*dayWidth);
	destW[0] = dayWidth;


	shapeW[7] = bgx;

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor; // equal to colors[2]
	cxa.fillRect(bgx,y1,bgw,h1);


	/// FUTURE CENTURY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[6]; //dark blue -- actually shows 21st century
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// CENTURY MARKER ///
	centuryX = shapeX[3]+(shapeW[3]/2);
	baseMarker(centuryX,shapeA[3],"21st Century",colors[6]);

	/// PAST CENTURY ///
	future = shapeX[0]-shapeX[3]; // future is the size of the past block [skull emoji]
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[5]; // light blue - past
	cxa.fillRect(shapeX[3],y1,future,h1);

	/// PAST YEAR ///
	future = shapeX[0]-shapeX[2];
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3]; // red 
	cxa.fillRect(shapeX[2],y1,future,h1);

	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0]; // yellow 
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// DATE MARKER ///
	topMarker(bgx,1,"200 years ago",colors[10]);

}

function draw3_6() { ////  EPOCH  ///////

	if (lastFrame<frame) { // FWD
	    dateA = destDateA = 0;

		shapeX[4] = shapeX[5] = shapeX[6] = shapeX[7] = bgx;
		shapeW[7] = bgw;
		//shapeW[4] = shapeX[0] - shapeX[4];
		shapeW[4] = destW[4] = (bgw/1000)*(thisDate.getFullYear()-2000);
		shapeW[5] = shapeW[6] = (shapeW[7]/3);

		tweenSpeed = 9;
		epochPhase = 1;
	}
	if (lastFrame>frame) { // BK
	    millWidth = bgw/11.5;
	    myWidth = 2;
	    destW[4] = myWidth;
		destW[6] = millWidth;
		destW[5] = millWidth;
	    destA[6] = 1;
	    destA[5] = 1;
		dateA = destDateA = 1;
		epochPhase = 3;
	}
	lastFrame = frame;

	destX[7] = bgx;
	shapeW[7] = shapeX[0] - (units*2);
	destA[7] = 1;
	destA[4] = 1;

	shapeA[8] = 1;
	shapeX[8] = bgx;
	shapeW[8] = shapeX[7]-(units*2);



	var millWidth = shapeW[7]/11.5;

	//3rd
	var myWidth = 2;



	//shapeW[4] = 20;
	shapeX[4] = shapeX[0]-shapeW[4];
	//destX[4] = (fullX-shapeW[4])-(units*2);

	//2nd mill --> industry
	shapeX[6] = shapeX[4]-shapeW[6];
	shapeX[6] += 0.8 * shapeW[6];
	shapeW[6] = 0.8 * shapeW[6];


	//1st
	shapeX[5] = shapeX[6]-shapeW[5];




	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	if (shapeX[0]>(fullX-(units*2.2)) && epochPhase==1) {

		destW[4] = myWidth;
		destW[6] = millWidth;
		destW[5] = millWidth;
		destA[6] = 1;
	    destA[5] = 1;
		destA[0] = 0;
		epochPhase = 2;
	}

	if (shapeA[6]>0.9) {
		destDateA = 1;
	}



	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// PLEIS ///
	cxa.globalAlpha = shapeA[8];
	cxa.fillStyle = colors[10];
	cxa.fillRect(shapeX[8],y1,shapeW[8],h1);

	/// EPOCH ///
	cxa.globalAlpha = shapeA[7];
	cxa.fillStyle = colors[7]; // green
	cxa.fillRect(shapeX[7],y1,shapeW[7],h1);


	/// 1AD MARKER ///
	centuryX = shapeX[5];
	topMarker(centuryX,shapeA[5],"1 A.D",colors[9]);


	//1st MILLENNIUM
	cxa.globalAlpha = shapeA[5];
	cxa.fillStyle = colors[9];
	cxa.fillRect(shapeX[5],y1,shapeW[5],h1);
	/// MARKER ///
	millX = shapeX[5]+(shapeW[5]/2);
	// baseMarker(millX,shapeA[5],"1st Millennium",colors[9]);



	//Industry
	cxa.globalAlpha = shapeA[6];
	cxa.fillStyle = colors[8];
	cxa.fillRect(shapeX[6],y1,shapeW[6],h1);
	/// MARKER ///
	millX = shapeX[6];
	baseMarker(millX,shapeA[6],"Industry",colors[8]);

	/// MILLENIUM ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[6]; // dark blue
	cxa.fillRect(shapeX[4],y1,shapeW[3],h1);

	/// BLOCK R ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(bgw+(units*2),y1-(units*0.55),units*2,h1+(units*4));

	// ///3rd MILLENIUM ///
	// cxa.globalAlpha = 1;
	// cxa.fillStyle = colors[5];
	// cxa.fillRect(shapeX[4],y1,shapeW[4],h1);
	// /// MARKER ///
	// millX = shapeX[4]+(shapeW[4]/2);
	// baseMarker(millX,shapeA[4],"3rd Millennium",colors[5]);


	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));



	/// DATE MARKER ///
	centuryX = shapeX[7];
	topMarker(centuryX,dateA,"11,500 years ago",colors[7]);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// ? ///
	/*cxa.fillStyle = copyColor;
	cxa.font = headerType+"px PT Sans";
	cxa.fillText("?", fullX-(units*1.4), halfY+(units*0.3));*/

}


function draw4() { // //  MILLENIUM  ///////// from millenium to epoch

    if (lastFrame<frame) { // FWD
		shapeX[4] = bgx;
		shapeW[4] = bgw;
		tweenSpeed = 10;

	}
	if (lastFrame>frame) { // BK
		shapeW[4] = destW[4] = (bgw/1000)*(thisDate.getFullYear()-2000);
		destA[0] = 1;
		tweenSpeed = 7;
	}
	lastFrame = frame;

	destA[7] = 0;
	destA[6] = 0;
	destA[5] = 0;

	destX[4] = bgx;
	destW[4] = bgw;




	//2nd
	shapeX[6] = shapeX[4]-shapeW[6];
	destW[6] = bgw;

	//1st
	shapeX[5] = shapeX[6]-shapeW[5];
	destW[5] = bgw;



	var centuryWidth = shapeW[4]/10;
	destX[3] = shapeX[3] = shapeX[4];
	destW[3] = centuryWidth;

	var yearWidth = shapeW[3]/100;
	shapeX[2] = shapeX[3]+((thisDate.getFullYear()-2000)*yearWidth);
	destW[2] = yearWidth;

	var monthWidth = shapeW[2]/12;
	shapeX[1] = shapeX[2]+(thisDate.getMonth()*monthWidth);
	destW[1] = monthWidth;


	var dayWidth = shapeW[1]/monthDays[thisDate.getMonth()];
	shapeX[0] = shapeX[1]+(thisDate.getDate()*dayWidth);
	destW[0] = dayWidth;


	shapeW[7] = shapeX[0]-bgx;

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// EPOCH ///
	cxa.globalAlpha = shapeA[7];
	cxa.fillStyle = colors[7];
	cxa.fillRect(bgx,y1,shapeW[7],h1);

	/// 1AD MARKER ///
	centuryX = shapeX[5];
	topMarker(centuryX,shapeA[5],"1 A.D",colors[9]);


	//1st MILLENNIUM
	cxa.globalAlpha = shapeA[5];
	cxa.fillStyle = colors[9]; //brighter cyan
	cxa.fillRect(shapeX[5],y1,shapeW[5],h1);


	//2nd MILLENNIUM
	cxa.globalAlpha = shapeA[6];
	cxa.fillStyle = colors[8];
	cxa.fillRect(shapeX[6],y1,shapeW[6],h1);

	/// MILLENIUM ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[6];
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// CENTURY MARKER ///
	centuryX = shapeX[3]+(shapeW[3]/2);
	baseMarker(centuryX,shapeA[3],"21st Century",colors[6]);

	/// CENTURY ///
	future = shapeX[0]-shapeX[3];
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[5];
	cxa.fillRect(shapeX[3],y1,future,h1);

	/// YEAR ///
	future = shapeX[0]-shapeX[2];
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3];
	cxa.fillRect(shapeX[2],y1,future,h1);

	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);
}

function draw5() { ////  EPOCH  ///////

	if (lastFrame<frame) { // FWD
	    dateA = destDateA = 0;

		shapeX[4] = shapeX[5] = shapeX[6] = shapeX[7] = bgx;
		shapeW[7] = bgw;
		//shapeW[4] = shapeX[0] - shapeX[4];
		shapeW[4] = destW[4] = (bgw/1000)*(thisDate.getFullYear()-2000);
		shapeW[5] = shapeW[6] = (shapeW[7]/3);

		tweenSpeed = 9;
		epochPhase = 1;
	}
	if (lastFrame>frame) { // BK
	    millWidth = bgw/11.5;
	    myWidth = 2;
	    destW[4] = myWidth;
		destW[6] = millWidth;
		destW[5] = millWidth;
	    destA[6] = 1;
	    destA[5] = 1;
		dateA = destDateA = 1;
		epochPhase = 3;
	}
	lastFrame = frame;

	destX[7] = bgx;
	shapeW[7] = shapeX[0] - (units*2);
	destA[7] = 1;
	destA[4] = 1;

	shapeA[8] = 1;
	shapeX[8] = bgx;
	shapeW[8] = shapeX[7]-(units*2);



	var millWidth = shapeW[7]/11.5;

	//3rd
	var myWidth = 2;



	//shapeW[4] = 20;
	shapeX[4] = shapeX[0]-shapeW[4];
	//destX[4] = (fullX-shapeW[4])-(units*2);

	//2nd
	shapeX[6] = shapeX[4]-shapeW[6];


	//1st
	shapeX[5] = shapeX[6]-shapeW[5];




	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	if (shapeX[0]>(fullX-(units*2.2)) && epochPhase==1) {

		destW[4] = myWidth;
		destW[6] = millWidth;
		destW[5] = millWidth;
		destA[6] = 1;
	    destA[5] = 1;
		destA[0] = 0;
		epochPhase = 2;
	}

	if (shapeA[6]>0.9) {
		destDateA = 1;
	}



	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// PLEIS ///
	cxa.globalAlpha = shapeA[8];
	cxa.fillStyle = colors[10];
	cxa.fillRect(shapeX[8],y1,shapeW[8],h1);

	/// EPOCH ///
	cxa.globalAlpha = shapeA[7];
	cxa.fillStyle = colors[7];
	cxa.fillRect(shapeX[7],y1,shapeW[7],h1);


	/// 1AD MARKER ///
	centuryX = shapeX[5];
	topMarker(centuryX,shapeA[5],"1 A.D",colors[9]);


	//1st MILLENNIUM
	cxa.globalAlpha = shapeA[5];
	cxa.fillStyle = colors[9];
	cxa.fillRect(shapeX[5],y1,shapeW[5],h1);
	/// MARKER ///
	millX = shapeX[5]+(shapeW[5]/2);
	baseMarker(millX,shapeA[5],"1st Millennium",colors[9]);



	//2nd MILLENNIUM
	cxa.globalAlpha = shapeA[6];
	cxa.fillStyle = colors[8];
	cxa.fillRect(shapeX[6],y1,shapeW[6],h1);
	/// MARKER ///
	millX = shapeX[6]+(shapeW[6]/2);
	baseMarker(millX,shapeA[6],"2nd Millennium",colors[8]);

	/// MILLENIUM ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[6];
	cxa.fillRect(shapeX[4],y1,shapeW[3],h1);

	/// BLOCK R ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(bgw+(units*2),y1-(units*0.55),units*2,h1+(units*4));

	///3rd MILLENIUM ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[5];
	cxa.fillRect(shapeX[4],y1,shapeW[4],h1);
	/// MARKER ///
	millX = shapeX[4]+(shapeW[4]/2);
	baseMarker(millX,shapeA[4],"3rd Millennium",colors[5]);


	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));



	/// DATE MARKER ///
	centuryX = shapeX[7];
	topMarker(centuryX,dateA,"11,500 years ago",colors[7]);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// ? ///
	/*cxa.fillStyle = copyColor;
	cxa.font = headerType+"px PT Sans";
	cxa.fillText("?", fullX-(units*1.4), halfY+(units*0.3));*/

}

function draw6() { ////   PERIOD

	if (lastFrame<frame) { // FWD
		shapeA[8] = 0;
		dateA = destDateA = 0;
		shapeX[8] = bgx;
		shapeW[8] = bgw;
		shapeW[7] = bgw;
		millWidth = shapeW[7]/11.5;
		shapeW[6] = millWidth;
		shapeW[5] = millWidth;

		tweenSpeed = 7;
	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;

		shapeW[8] = (bgw/100)*5;
		shapeX[8] = bgw+(units*2)-shapeW[8];
		destA[7] = 1;
		destA[9] = destA[10] = destA[11] = 0;
	}
	lastFrame = frame;



	destX[8] = bgx;
	//destW[8] = bgw;
	shapeW[8] = bgw - (shapeX[8] - bgx);
	destA[8] = 1;





	shapeW[9] = shapeW[8];
	shapeX[9] = (fullX-shapeW[9]) - (units*2);

	shapeW[10] = shapeW[8]*6;
	shapeX[10] = shapeX[9] - shapeW[10];

	shapeW[11] = shapeW[8]*13;
	shapeX[11] = shapeX[10] - shapeW[11];



	destA[4] = 0;
	destA[5] = 0;
	destA[6] = 0;

	destW[7] = (shapeW[8]/100)*0.45;
	shapeX[7] = (fullX-shapeW[7]) - (units*2);

	var millWidth = shapeW[7]/11.5;
	myWidth = 2;
	//3rd
	shapeX[4] = shapeX[0]-shapeW[4];
	destW[4] = 0;

	//2nd
	shapeX[6] = shapeX[4]-shapeW[6];
	destW[6] = 0;
	shapeW[6] = millWidth;

	//1st
	shapeX[5] = shapeX[6]-shapeW[5];
	destW[5] = 0;
	shapeW[5] = millWidth;



	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	if (shapeA[6]<0.1) {
		destDateA = 1;
	}


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// PALEOGENE ///
	cxa.globalAlpha = shapeA[11];
	cxa.fillStyle = colors[13];
	cxa.fillRect(shapeX[11],y1,shapeW[11],h1);
	/// MARKER ///
	millX = shapeX[11]+(shapeW[11]/2);
	baseMarker(millX,shapeA[11],"Paleogene period",colors[13]);

	/// NEOGENE ///
	cxa.globalAlpha = shapeA[10];
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[10],y1,shapeW[10],h1);
	/// MARKER ///
	millX = shapeX[10]+(shapeW[10]/2);
	baseMarker(millX,shapeA[10],"Neogene period",colors[12]);

	/// QUATERNARY ///
	cxa.globalAlpha = shapeA[9];
	cxa.fillStyle = colors[11];
	cxa.fillRect(shapeX[9],y1,shapeW[9],h1);
	/// MARKER ///
	millX = shapeX[9]+(shapeW[9]/2);
	baseMarker(millX,shapeA[9],"Quaternary period",colors[11]);


	/// PLEIS ///
	cxa.globalAlpha = shapeA[8];
	cxa.fillStyle = colors[10];
	cxa.fillRect(shapeX[8],y1,shapeW[8],h1);

	/// MARKER ///
	millX = (shapeX[8]-shapeW[7])+(shapeW[8]/2);
	baseMarker(millX,shapeA[8],"Pleistocene epoch",colors[10]);

	/// HOLO ///
	cxa.globalAlpha = shapeA[7];
	cxa.fillStyle = colors[7];
	cxa.fillRect(shapeX[7],y1,shapeW[7],h1);

	/// MARKER ///
	millX = shapeX[7]+(shapeW[7]/2);
	baseMarker(millX,shapeA[7],"Holocene epoch",colors[7]);




	if (shapeW[6]>(units/60)) { // if wide enough to bother drawing

	    ///3rd MILLENIUM ///
		cxa.globalAlpha = 1;
		cxa.fillStyle = greyColor;
		cxa.fillRect(shapeX[0],y1,(fullX-shapeX[0])-(units*2),h1);

		//cxa.globalAlpha = 1;
		cxa.fillStyle = colors[5];
		cxa.fillRect(shapeX[4],y1,shapeW[4],h1);
		/// MARKER ///
		millX = shapeX[4]+(shapeW[4]/2);
		baseMarker(millX,shapeA[4],"3rd Millennium",colors[5]);


		//1st MILLENNIUM
		cxa.globalAlpha = 1;
		cxa.fillStyle = colors[9];
		cxa.fillRect(shapeX[5],y1,shapeW[5],h1);
		/// MARKER ///
		millX = shapeX[5]+(shapeW[5]/2);
		baseMarker(millX,shapeA[5],"3rd Millennium",colors[9]);

		/// 1AD MARKER ///
		centuryX = shapeX[5];
		topMarker(centuryX,shapeA[5],"1 A.D",colors[9]);

		//2nd MILLENNIUM
		cxa.globalAlpha = 1;
		cxa.fillStyle = colors[8];
		cxa.fillRect(shapeX[6],y1,shapeW[6],h1);
	    /// MARKER ///
		millX = shapeX[6]+(shapeW[6]/2);
		baseMarker(millX,shapeA[6],"3rd Millennium",colors[8]);
	}

	/// DATE MARKER ///
	centuryX = shapeX[7];
	topMarker(shapeX[7],shapeA[5],"11,500 years ago",colors[7]);

	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[8];
	topMarker(centuryX,dateA,"2 . 588 million years ago",colors[10]);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// ? ///
	/*cxa.fillStyle = copyColor;
	cxa.font = headerType+"px PT Sans";
	cxa.fillText("?", fullX-(units*1.4), halfY+(units*0.3));*/
}

function draw7() { ////   ERA ////

	if (lastFrame<frame) { // FWD
		dateA = destDateA = 0;
		shapeX[9] = bgx;
		shapeW[11] = shapeW[10] = shapeW[9] = bgw;
		tweenSpeed = 7;

		destW[9] = (bgw/100)*5;
	    destW[10] = (bgw/100)*30;

		shapeW[12] = bgw*20;
		destW[12] = bgw;
		shapeX[12] = (fullX-shapeW[12]) - (units*2);
	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		eraWidth = Math.round((bgw/100)*12);


	    shapeW[12] = (bgw/100)*12;
	    destW[12] = bgw;
	    shapeX[12] = (fullX-shapeW[12]) - (units*2);
		//meso
		shapeW[13] = (bgw/100)*34;
		destW[13] = bgw*2;
		shapeX[13] = shapeX[12]-shapeW[13];
		//paleo
		shapeW[14] = (bgw/100)*54;
		destW[13] = bgw*3;
		shapeX[14] = shapeX[13]-shapeW[14];

		shapeA[9] = 1;
		shapeA[10] = 1;
		shapeA[11] = 1;
		tweenSpeed = 8;
	}
	lastFrame = frame;

	destA[9] = 1;
	destA[10] = 1;
	destA[11] = 1;
	destA[12] = 0;
	destA[13] = 0;
	destA[14] = 0;

	shapeX[12] = (fullX-shapeW[12]) - (units*2);
    shapeX[13] = shapeX[12]-shapeW[13];
	shapeX[14] = shapeX[13]-shapeW[14];

	//destW[9] = (bgw/100)*5;
	shapeW[9] = (shapeW[12]/100)*5;
	shapeX[9] = (bgw-shapeW[9]) + (units*2);

	//destW[10] = (bgw/100)*30;
	shapeW[10] = (shapeW[12]/100)*30;
	shapeX[10] = shapeX[9] - shapeW[10];

	//shapeW[11] = bgw - (destW[10]+destW[9]);
	shapeW[11] = shapeW[12] - (shapeW[10]+shapeW[9]);
	shapeX[11] = shapeX[10] - shapeW[11];



	destA[8] = 0;
	destA[7] = 0;

	shapeW[8] = (shapeW[9]/100)*99.55;
	shapeX[8] = shapeX[9];

	shapeW[7] = (shapeW[9]/100)*0.45;
	shapeX[7] = (fullX-shapeW[7]) - (units*2);

	if (shapeA[8]<0.1) {
		destDateA = 1;
	}


	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);


	/// PALEOZOIC ///
	cxa.globalAlpha = shapeA[14];
	cxa.fillStyle = colors[16];
	cxa.fillRect(shapeX[14],y1,shapeW[14],h1);
	/// MARKER ///
	millX = shapeX[14]+(shapeW[14]/2);
	baseMarker(millX,shapeA[14],"Paleozoic era",colors[16]);

	/// MESOZOIC ///
	cxa.globalAlpha = shapeA[13];
	cxa.fillStyle = colors[15];
	cxa.fillRect(shapeX[13],y1,shapeW[13],h1);
	/// MARKER ///
	millX = shapeX[13]+(shapeW[13]/2);
	baseMarker(millX,shapeA[13],"Mesozoic era",colors[15]);

	/// CENOZOIC ///
	cxa.globalAlpha = shapeA[12];
	cxa.fillStyle = colors[14];
	cxa.fillRect(shapeX[12],y1,shapeW[12],h1);
	/// MARKER ///
	millX = shapeX[12]+(shapeW[12]/2);
	baseMarker(millX,shapeA[12],"Cenozoic era",colors[14]);


	/// PALEOGENE ///
	cxa.globalAlpha = shapeA[11];
	cxa.fillStyle = colors[13];
	cxa.fillRect(shapeX[11],y1,shapeW[11],h1);
	/// MARKER ///
	millX = shapeX[11]+(shapeW[11]/2);
	baseMarker(millX,shapeA[11],"Paleogene period",colors[13]);

	/// NEOGENE ///
	cxa.globalAlpha = shapeA[10];
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[10],y1,shapeW[10],h1);
	/// MARKER ///
	millX = shapeX[10]+(shapeW[10]/2);
	baseMarker(millX,shapeA[10],"Neogene period",colors[12]);

	/// QUATERNARY ///
	cxa.globalAlpha = shapeA[9];
	cxa.fillStyle = colors[11];
	cxa.fillRect(shapeX[9],y1,shapeW[9],h1);
	/// MARKER ///
	millX = shapeX[9]+(shapeW[9]/2);
	baseMarker(millX,shapeA[9],"Quaternary period",colors[11]);

	/// PLEIS ///
	cxa.globalAlpha = shapeA[8];
	cxa.fillStyle = colors[10];
	cxa.fillRect(shapeX[8],y1,shapeW[8],h1);

	/// MARKER ///
	millX = (shapeX[8]-shapeW[7])+(shapeW[8]/2);
	baseMarker(millX,shapeA[8],"Pleistocene epoch",colors[10]);

	/// HOLO ///
	cxa.globalAlpha = shapeA[7];
	cxa.fillStyle = colors[7];
	cxa.fillRect(shapeX[7],y1,shapeW[7],h1);

	/// MARKER ///
	millX = shapeX[7]+(shapeW[7]/2);
	baseMarker(millX,shapeA[7],"Holocene epoch",colors[7]);

	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[10];
	topMarker(centuryX,shapeA[10],"23 million years ago",colors[12]);
	/// DATE MARKER ///
	centuryX = shapeX[8];
	topMarker(centuryX,shapeA[8],"2 . 588 million years ago",colors[10]);
	/// DATE MARKER ///
	centuryX = shapeX[11];
	if (centuryX<bgx) {
		centuryX = bgx;
	}
	topMarker(centuryX,dateA,"66 million years ago",colors[13]);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// ? ///
	/*cxa.fillStyle = copyColor;
	cxa.font = headerType+"px PT Sans";
	cxa.fillText("?", fullX-(units*1.4), halfY+(units*0.3));*/
}

function draw8() {  /////    EON //////

	if (lastFrame<frame) { // FWD
		dateA = destDateA = 0;
		shapeX[12] = bgx;
		shapeW[12] = shapeW[13] = shapeW[14] = bgw;
		tweenSpeed = 6;
		cometCount = [360,405,420,300,400,100];
		cometNo = 2;
	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		tweenSpeed = 6;

		destW[19] = bgw*8.3;
		shapeW[19] = bgw;
	}
	lastFrame = frame;




	destA[9] = 0;
	destA[10] = 0;
	destA[11] = 0;
	destA[12] = 1;
	destA[13] = 1;
	destA[14] = 1;
	destA[15] = 0;
	destA[16] = 0;
	destA[17] = 0;
	destA[18] = 0;
	destA[19] = 0;


	shapeX[19] = (bgw+bgx)-shapeW[19];


	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];


	//ceno
	destW[12] = (bgw/100)*12;
	shapeX[12] = (fullX-shapeW[12]) - (units*2);
	//meso
	destW[13] = (bgw/100)*34;
	shapeX[13] = shapeX[12]-shapeW[13];
	//paleo
	destW[14] = (bgw/100)*54;
	shapeX[14] = shapeX[13]-shapeW[14];


	//---

	//qua
	shapeW[9] = (shapeW[12]/100)*5;
	shapeX[9] = (fullX-shapeW[9]) - (units*2);


	//neo
	shapeW[10] = (shapeW[12]/100)*30;
	shapeX[10] = shapeX[9] - shapeW[10];


	//pal
	shapeW[11] = shapeW[12] - (shapeW[10]+shapeW[9]);
	shapeX[11] = shapeX[10] - shapeW[11];


	if (shapeA[9]<0.1) {
		destDateA = 1;
	}



	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);


	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	baseMarker(millX,shapeA[18],"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	baseMarker(millX,shapeA[17],"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	baseMarker(millX,shapeA[16],"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	baseMarker(millX,shapeA[15],"Phanerozoic eon",colors[17]);


	/// PALEOZOIC ///
	cxa.globalAlpha = shapeA[14];
	cxa.fillStyle = colors[16];
	cxa.fillRect(shapeX[14],y1,shapeW[14],h1);
	/// MARKER ///
	millX = shapeX[14]+(shapeW[14]/2);
	baseMarker(millX,shapeA[14],"Paleozoic era",colors[16]);

	/// MESOZOIC ///
	cxa.globalAlpha = shapeA[13];
	cxa.fillStyle = colors[15];
	cxa.fillRect(shapeX[13],y1,shapeW[13],h1);
	/// MARKER ///
	millX = shapeX[13]+(shapeW[13]/2);
	baseMarker(millX,shapeA[13],"Mesozoic era",colors[15]);

	/// CENOZOIC ///
	cxa.globalAlpha = shapeA[12];
	cxa.fillStyle = colors[14];
	cxa.fillRect(shapeX[12],y1,shapeW[12],h1);
	/// MARKER ///
	millX = shapeX[12]+(shapeW[12]/2);
	baseMarker(millX,shapeA[12],"Cenozoic era",colors[14]);



	/// PALEOGENE ///
	cxa.globalAlpha = shapeA[11];
	cxa.fillStyle = colors[13];
	cxa.fillRect(shapeX[11],y1,shapeW[11],h1);
	/// MARKER ///
	millX = shapeX[11]+(shapeW[11]/2);
	baseMarker(millX,shapeA[11],"Paleogene period",colors[13]);

	/// NEOGENE ///
	cxa.globalAlpha = shapeA[10];
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[10],y1,shapeW[10],h1);
	/// MARKER ///
	millX = shapeX[10]+(shapeW[10]/2);
	baseMarker(millX,shapeA[10],"Neogene period",colors[12]);

	/// QUATERNARY ///
	cxa.globalAlpha = shapeA[9];
	cxa.fillStyle = colors[11];
	cxa.fillRect(shapeX[9],y1,shapeW[9],h1);
	/// MARKER ///
	millX = shapeX[9]+(shapeW[9]/2);
	baseMarker(millX,shapeA[9],"Quaternary period",colors[11]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[10];
	topMarker(centuryX,shapeA[10],"23 million years ago",colors[12]);
	/// DATE MARKER ///
	topMarker(shapeX[12],shapeA[12],"66 million years ago",colors[14]);
	/// DATE MARKER ///
	topMarker(shapeX[13],shapeA[13],"252 million years ago",colors[15]);
	/// DATE MARKER ///
	centuryX = shapeX[14];
	if (centuryX<bgx) {
		centuryX = bgx;
	}
	topMarker(centuryX,dateA,"542 million years ago",colors[16]);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// ? ///
	/*cxa.fillStyle = copyColor;
	cxa.font = headerType+"px PT Sans";
	cxa.fillText("?", fullX-(units*1.4), halfY+(units*0.3));*/
}
function draw9() {

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 0;
		//geo scale
		shapeW[19] = bgw*8.3;

		tweenSpeed = 7;
	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		desth1 = (units*2);
		tweenSpeed = 7;
		destW[20] = 1;
	}
	lastFrame = frame;

	destA[14] = 0;
	destA[13] = 0;
	destA[12] = 0;
	destA[15] = 1;
	destA[16] = 1;
	destA[17] = 1;
	destA[18] = 1;
	destA[19] = 1;
	destA[20] = 0;

	shapeX[20] = (bgw+bgx)-shapeW[20];
	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];



	//ceno
	shapeW[12] = (shapeW[15]/100)*12;
	shapeX[12] = (fullX-shapeW[12]) - (units*2);
	//meso
	shapeW[13] = (shapeW[15]/100)*34;
	shapeX[13] = shapeX[12]-shapeW[13];
	//paleo
	shapeW[14] = (shapeW[15]/100)*54;
	shapeX[14] = shapeX[13]-shapeW[14];


	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //

	// LIFE //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = colors[21];
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"3600 million years ago",colors[21]);

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);


	/// PALEOZOIC ///
	cxa.globalAlpha = shapeA[14];
	cxa.fillStyle = colors[16];
	cxa.fillRect(shapeX[14],y1,shapeW[14],h1);
	/// MARKER ///
	millX = shapeX[14]+(shapeW[14]/2);
	baseMarker(millX,shapeA[14],"Paleozoic era",colors[16]);

	/// MESOZOIC ///
	cxa.globalAlpha = shapeA[13];
	cxa.fillStyle = colors[15];
	cxa.fillRect(shapeX[13],y1,shapeW[13],h1);
	/// MARKER ///
	millX = shapeX[13]+(shapeW[13]/2);
	baseMarker(millX,shapeA[13],"Mesozoic era",colors[15]);

	/// CENOZOIC ///
	cxa.globalAlpha = shapeA[12];
	cxa.fillStyle = colors[14];
	cxa.fillRect(shapeX[12],y1,shapeW[12],h1);
	/// MARKER ///
	millX = shapeX[12]+(shapeW[12]/2);
	baseMarker(millX,shapeA[12],"Cenozoic era",colors[14]);



	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	baseMarker(millX,shapeA[18],"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	baseMarker(millX,shapeA[17],"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	baseMarker(millX,shapeA[16],"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	baseMarker(millX,shapeA[15],"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	//centuryX = shapeX[10];
	//topMarker(centuryX,shapeA[10],"23 million years ago",colors[12]);
	/// DATE MARKER ///
	//topMarker(shapeX[12],shapeA[12],"66 million years ago",colors[14]);
	/// DATE MARKER ///
	//topMarker(shapeX[13],shapeA[13],"252 million years ago",colors[15]);
	/// DATE MARKER ///
	topMarker(shapeX[15],shapeA[15],"542 million years ago",colors[17]);
	/// DATE MARKER ///
	topMarker(shapeX[16],shapeA[16],"2500 million years ago",colors[18]);

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",colors[20]);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);



}
function draw10() {   ///   LIFE

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[21];
		lastCol = colors[22];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life
		shapeW[20] = 1;
		//destW[20] = (bgw/100)*81;
	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		lastCol = colors[22];
		focusCol = colors[21];
	}
	lastFrame = frame;

	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 1;
	destA[21] = 0;

	shapeX[20] = (bgw+bgx)-shapeW[20];
	shapeX[21] = (bgw+bgx)-shapeW[21];
	destW[21] = destW[20] = (bgw/100)*81;
	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// LIFE //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"3600 million years ago",focusCol);

	// OXY //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"",lastCol);



	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);







	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],desth1*2);



}
function draw11() {   ///   OXIDATION

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[22];
		lastCol = colors[21];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		shapeW[21] = shapeW[20] = (bgw/100)*81;

	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[22];
		lastCol = colors[5];
	}
	lastFrame = frame;

	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 0;
	destA[21] = 1;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	destW[21] = (bgw/100)*55;
	shapeX[20] = (bgw+bgx)-shapeW[20];
	destW[20] = (bgw/100)*55;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// LIFE //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = colors[21];
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"",colors[21]);

	// OXY //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = colors[22];
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"2500 million years ago",colors[22]);


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);







	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],desth1*2);



}
function draw12() {   ///   FISH

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[5];
		lastCol = colors[22];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		shapeW[21] = shapeW[20] = (bgw/100)*55;

	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[5];
		lastCol = colors[15];
	}
	lastFrame = frame;

	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 1;
	destA[21] = 0;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	destW[21] = (bgw/100)*11;
	shapeX[20] = (bgw+bgx)-shapeW[20];
	destW[20] = (bgw/100)*11;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// FISH //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"500 million years ago",focusCol);

	// OXY //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"",lastCol);


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);







	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],desth1*2);



}
function draw13() {   ///   INSECTS

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[15];
		lastCol = colors[5];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		shapeW[21] = shapeW[20] = (bgw/100)*11;

	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[15];
		lastCol = colors[7];
	}
	lastFrame = frame;

	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 0;
	destA[21] = 1;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	destW[21] = (bgw/100)*9;
	shapeX[20] = (bgw+bgx)-shapeW[20];
	destW[20] = (bgw/100)*9;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// FISH //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"",lastCol);

	// INSECTS //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"400 million years ago",focusCol);


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);







	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],desth1*2);



}
function draw14() {   ///   REPTILES

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[7];
		lastCol = colors[15];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		shapeW[21] = shapeW[20] = (bgw/100)*9;

	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[7];
		lastCol = colors[3];
	}
	lastFrame = frame;

	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 1;
	destA[21] = 0;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	destW[21] = (bgw/100)*7;
	shapeX[20] = (bgw+bgx)-shapeW[20];
	destW[20] = (bgw/100)*7;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// REPTILES //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"300 million years ago",focusCol);

	// INSECTS //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"",lastCol);


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);







	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],desth1*2);



}


function draw15() {   ///   MAMMALS

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[3];
		lastCol = colors[7];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		shapeW[21] = shapeW[20] = (bgw/100)*7;

	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[3];
		lastCol = colors[17];
	}
	lastFrame = frame;

	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 0;
	destA[21] = 1;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	destW[21] = (bgw/100)*4.5;
	shapeX[20] = (bgw+bgx)-shapeW[20];
	destW[20] = (bgw/100)*4.5;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// REPTILES //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///Draw()
	baseMarker2(shapeX[20],shapeA[20],"",lastCol);

	// MAMMALS //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"200 million years ago",focusCol);


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);







	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],desth1*2);



}


function draw16() {   ///   BIRDS

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[17];
		lastCol = colors[3];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		shapeW[21] = shapeW[20] = (bgw/100)*4.5;

	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[17];
		lastCol = colors[1];
	}
	lastFrame = frame;

	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 1;
	destA[21] = 0;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	destW[21] = (bgw/100)*3;
	shapeX[20] = (bgw+bgx)-shapeW[20];
	destW[20] = (bgw/100)*3;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// BIRDS //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"150 million years ago",focusCol);

	// MAMMALS //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"",lastCol);


	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);







	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],desth1*2);



}

function draw17() {   ///   HUMANS

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 1;
		focusCol = colors[1];
		lastCol = colors[17];
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		shapeW[21] = shapeW[20] = (bgw/100)*3;
		shapeA[19] = 0;
	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[1];
		lastCol = colors[1];
		shapeA[19] = 1;
	}
	lastFrame = frame;
	desty1 = halfY-units;
	desth1 = units;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0.1;
	destA[16] = 0.1;
	destA[17] = 0.1;
	destA[18] = 0.05;
	destA[20] = 0;
	destA[21] = 1;
	destA[19] = 0;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	shapeX[20] = (bgw+bgx)-shapeW[20];
	var humanWidth = (bgw/100)*0.005;
	if (humanWidth<2) {
		humanWidth = 2;
	}

	destW[21] = destW[20] = humanWidth;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeA[15]>0.9) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// BIRDS //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"",lastCol);

	// HUMANS //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"200,000 years ago",focusCol);


	/// GREY ///
	cxa.globalAlpha = shapeA[19];
	cxa.fillStyle = colors[2];
	cxa.fillRect(bgx,y1,bgw,h1);
	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(shapeX[19],y1,shapeW[19],h1);
	/// EARTH ///
	cxa.globalAlpha = shapeA[19];
	cxa.fillStyle = colors[3];
	cxa.fillRect(shapeX[19],y1,shapeW[19],h1);

	/// MARKER ///
	baseMarker2(shapeX[19],shapeA[19],"Earth is born",colors[3]);






	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));

	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,dateA,"4540 million years ago",copyColor);


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],halfY-units,shapeW[0],desth1*2);



}

function draw18() {   ///   UNIVERSE

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 0;
		focusCol = colors[1];
		lastCol = colors[1];
		shapeA[19] = 0;
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 10;
		//destW[19] = bgw;

		//life & oxy
		//shapeW[21] = shapeW[20] = (bgw/100)*3;

	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		focusCol = colors[1];
		lastCol = colors[1];
	}
	lastFrame = frame;
	//desty1 = halfY-(units*0.5);
	desth1 = units*2;
	h2 = desth2 = units;
	y2 = desty2 = halfY;

	destA[15] = 0;
	destA[16] = 0;
	destA[17] = 0;
	destA[18] = 0;
	destA[20] = 0;
	destA[21] = 0;
	//shapeA[19] = 0;
	destA[19] = 1;

	shapeX[21] = (bgw+bgx)-shapeW[20];
	shapeX[20] = (bgw+bgx)-shapeW[20];
	var humanWidth = (bgw/100)*0.005;
	if (humanWidth<2) {
		humanWidth = 2;
	}

	destW[21] = destW[20] = humanWidth;



	shapeX[19] = (bgw+bgx)-shapeW[19];
	destW[19] = bgw/3;

	//phane
	shapeW[15] = (shapeW[19]/100)*12;
	shapeX[15] = (fullX-shapeW[15]) - (units*2);
	//proto
	shapeW[16] = (shapeW[19]/100)*43;
	shapeX[16] = shapeX[15]-shapeW[16];
	//arch
	shapeW[17] = (shapeW[19]/100)*33;
	shapeX[17] = shapeX[16]-shapeW[17];
	//had
	shapeW[18] = (shapeW[19]/100)*12;
	shapeX[18] = shapeX[17]-shapeW[18];




	if (shapeW[19]<(bgw*0.4)) {
		destDateA = 1;
	}

	var dayWidth = 1;
	destX[0] = fullX-(units*2);
	destW[0] = dayWidth;

	// DRAWING //



	// BIRDS //
	cxa.globalAlpha = shapeA[20];
	cxa.fillStyle = lastCol;
	cxa.fillRect(shapeX[20],y2,shapeW[20],h2);
	/// MARKER ///
	baseMarker2(shapeX[20],shapeA[20],"",lastCol);

	// HUMANS //
	cxa.globalAlpha = shapeA[21];
	cxa.fillStyle = focusCol;
	cxa.fillRect(shapeX[21],y2,shapeW[21],h2);
	/// MARKER ///
	baseMarker2(shapeX[21],shapeA[21],"200,000 years ago",focusCol);


	/// UNI ///
	cxa.globalAlpha = shapeA[19];
	cxa.fillStyle = colors[2];
	cxa.fillRect(bgx,y1,bgw,h1);

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(shapeX[19],y1,shapeW[19],h1);
	/// EARTH ///
	cxa.globalAlpha = shapeA[19];
	cxa.fillStyle = colors[3];
	cxa.fillRect(shapeX[19],y1,shapeW[19],h1);

	/// MARKER ///
	baseMarker2(shapeX[19],shapeA[19],"Earth is born",colors[3]);






	/// HADEAN ///
	cxa.globalAlpha = shapeA[18];
	cxa.fillStyle = colors[20];
	cxa.fillRect(shapeX[18],y1,shapeW[18],h1);
	/// MARKER ///
	millX = shapeX[18]+(shapeW[18]/2);
	//baseMarker(millX,shapeA[18]*0.1,"Hadean eon",colors[20]);

	/// ARCHEAN ///
	cxa.globalAlpha = shapeA[17];
	cxa.fillStyle = colors[19];
	cxa.fillRect(shapeX[17],y1,shapeW[17],h1);
	/// MARKER ///
	millX = shapeX[17]+(shapeW[17]/2);
	//baseMarker(millX,shapeA[17]*0.1,"Archean eon",colors[19]);

	/// PROTOZOIC ///
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[18];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	/// MARKER ///
	millX = shapeX[16]+(shapeW[16]/2);
	//baseMarker(millX,shapeA[16]*0.1,"Protorezoic eon",colors[18]);

	/// PHANEROZOIC ///
	cxa.globalAlpha = shapeA[15];
	cxa.fillStyle = colors[17];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	/// MARKER ///
	millX = shapeX[15]+(shapeW[15]/2);
	//baseMarker(millX,shapeA[15]*0.1,"Phanerozoic eon",colors[17]);



	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));
	/// MARKER ///
	baseMarker2(bgx,dateA,"The universe is born",copyColor);
	/// DATE MARKER ///
	centuryX = shapeX[18];
	if (centuryX<bgx) {
		centuryX = bgx;
	}

	topMarker(centuryX,1,"4540 million years ago",copyColor);
	topMarker(bgx,dateA,"13798 million years ago",copyColor);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],halfY-units,shapeW[0],desth1);



}

function endFrame() {

	destA[0] = 1;
	if (endCount==30) {
		frame = 0;
		buttonLock = 0;

		destX[0] = halfX-units;
	    destW[0] = units*2;
		shapeA[1] = destA[1] = 0;
	}

	cxa.fillStyle = bgColor;

	if (endCount<30) {
		cxa.globalAlpha = endCount/25;
		cxa.fillRect(0,0,fullX,fullY);
	}
	if (endCount>29 && endCount<61) {
		cxa.globalAlpha = 1;
		cxa.fillRect(0,0,fullX,fullY);
	}
	if (endCount>60 && endCount<90) {
		cxa.globalAlpha = (90-endCount)/30;
		cxa.fillRect(0,0,fullX,fullY);
	}

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	endCount += 1;
}
