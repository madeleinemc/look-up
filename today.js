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

var colors = ['#e0ce00','#ff6600','#993d00','#ff2244','#550033','#0099ff','#003355','#00a172','#a800ff','#00d2ff','#7e00ff','#ee2b2b','#960058','#e6003c','#eb3700','#ff9702','#f6ff02'
//////        0-yellow  1-orange  2-d/orange 3-rose   4-r/purple  5-cyan    6-d/blue 7-b/green  8-purple 9-cyan2  10-purple2 11-red    12-magenta 13-red  14-d/orange 15-amber  16-yellow
,'#feb300','#cb1831','#6e1160','#2a0f6f','#1aecae','#91ec1a','#555'];
//17-lemon 18-red    19-plum   20-dark elf 21-life 22-okidation 23-todaysmall

var focusCol = colors[0];
var lastCol = colors[0];


var frame = 0;
var lastFrame = -1;
var epochPhase = 1;
var eraWidth = 0;

var headerTxt = ['Today','This Month','This Year','This Century','Industrialized Civilization','Existence of Agriculture','Humans','Potential Existence of Humans','Advanced Multicellular Life','The Earth','The Universe','Until the Earth Ends','Until the Sun Ends','Stuck in the Local Group','Reaching the Affectable Universe','Stelliferous Era','Stelliferous Era: Log Scale','Degenerate Era','Black Hole Era','The Dark Era',''];
var blurbTxt = [];

var frameFunction = [draw0,draw1,draw2,draw3,draw3_5,draw3_6,draw6,draw4,draw6_5,draw7,draw8,draw9,draw10,draw11,draw12,draw13,draw14,draw15,draw16,draw17];

var tweenSpeed = 3;

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
	blurbTxt = [today,thisMonth,thisYear,'21st Century', 'The Industrial Revolution in the late 18th century started a worldwide economic transformation.', 'The development of agriculture during an interglacial period allowed communities to form.','Anatomically modern Homo sapiens emerged in Africa.','Historically, mammal species exist for about 1 million years before going extinct.','The Cambrian Explosion about 538.8 million years ago resulted in the emergence of most current animal phyla.','The Earth formed from the Sun\'s planetary disk.','In the beginning, radiation dominated the universe - this was known as the primordial era.','In about 5 billion years, the Sun will evolve into a red giant, swallowing or ejecting the Earth in the process.','After a brief giant phase, the Sun violently ejects its outer shell to become a white dwarf.','At this time, space is expanding so fast that we would be unable to leave the Local Group (about 50 galaxies; the Milky Way is one of the largest)','If we escape the Local Group we can reach the affectable universe - all that is possible for us to reach. Theoretically, this only requires six hours of the Sun\'s energy','This is the time period in for which stars are forming (from now on we\'ll use a log scale to avoid worthless infographics like this one ...)','The same thing but depicted in log time (base 10)','Star formation ceases. Existing stars slowly burn out. Red (and brown) dwarfs last the longest.','Black holes dissipate through Hawking radiation. We can still get energy from this and other methods.','We might be able to get radiation energy from positronium. Also, this state theoretically continues forever as heat death (though there are other theories of the end of the universe)'];



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
		cxa.fillText('Madeleine Chang / Whitevinyl', (fullX-(units*0.5))-1, fullY-(units*0.5));
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

		if (frame<4) {
		    cxa.fillText(blurbTxt[frame], halfX, halfY+(units*1.8));
		} else {
			cxa.fillText(blurbTxt[frame], halfX, halfY-(units*2));
			cxa.font = "italic " + bodyType+"px PT Sans";
			if (frame<9) {
			    cxa.fillText("(civilization)", halfX, halfY-(units*2.6));
			}
		}

		/// LINE ///

		// cxa.beginPath();
		// cxa.moveTo(halfX-headerWidth,halfY+(units*3));
		// cxa.lineTo(halfX+headerWidth,halfY+(units*3));
		// cxa.stroke();




		/// CTA ///

		// if (frame>0) {
		// 	cxa.font = "italic "+midType+"px georgia";

		// 	// use the commented one for backwards transitions
		// 	//cxa.fillText("- back | Okay +", halfX+(units*0.15), halfY+(units*4.5));
		// 	cxa.fillText("(+)", halfX+(units*0.15), halfY+(units*4.5));

		// 	// allow backwards transitions
		// 	if (backOver==true) {

		// 	cxa.beginPath();
		// 	cxa.moveTo(halfX-(units*1.4),halfY+(units*4.8));
		// 	cxa.lineTo(halfX-(units*0.3),halfY+(units*4.8));
		// 	cxa.stroke();
		// 	} else {

		// 	cxa.beginPath();
		// 	cxa.moveTo(halfX+(units*0.3),halfY+(units*4.8));
		// 	cxa.lineTo(halfX+(units*1.5),halfY+(units*4.8));
		// 	cxa.stroke();
		// 	}

		// } else {
			cxa.font = "italic "+midType+"px georgia";
		    cxa.fillText("", halfX, halfY+(units*4.5));

			if (okOver==true) {

			cxa.beginPath();
			cxa.moveTo(halfX-(units),halfY+(units*4.8));
			cxa.lineTo(halfX+(units),halfY+(units*4.8));
			cxa.stroke();
			}

		// }


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
			window.location = "http://madchang.com/";
			//window.open("http://whitevinyldesign.com","_blank");
		}else {
			if (frame!==19) {
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

	tweenSpeed = 5;

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

		tweenSpeed = 5;
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
	
		dateA = destDateA = 1;
		shapeW[4] = 0; // it expands from 0 to bgw
		shapeX[4] = bgx; // where it starts before animation
		 
		destA[4] = 1;
		destW[2] = 0;
		
		tweenSpeed = 5;		
	}
	if (lastFrame>frame) { // BK
		dateA = destDateA = 1;
		shapeW[4] = destW[4] = 0;
		
		tweenSpeed = 5;
		
	}
	lastFrame = frame;

	// why are these here?
	destA[7] = 0;
	destA[6] = 0;
	destA[5] = 0;


	// industrialization = whole bar
	destX[4] = bgx; // Left edge of the bar AFTER animation
	destW[4] = bgw; // Width of the bar AFTER animation
	
	// SET THE NEW PROPERTIES //

	var centuryWidth = shapeW[4]/2.94; // 1000/340 = 2.94

	destX[3]  = bgx + bgw -centuryWidth; // where light blue starts
	
	destW[3] = bgw - shapeX[0];


	var yearWidth = shapeW[3]/100;
	destX[2] = shapeX[3] +((thisDate.getFullYear()-2000)*yearWidth);
	destW[2] = yearWidth;

	var monthWidth = shapeW[2]/12;
	shapeX[1] = shapeX[2]+(thisDate.getMonth()*monthWidth);
	destW[1] = monthWidth;


	var dayWidth = shapeW[1]/monthDays[thisDate.getMonth()];
	shapeX[0] = shapeX[1]+(thisDate.getDate()*dayWidth);
	destW[0] = dayWidth;

	/// BACKGROUND GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor; 
	cxa.fillRect(bgx,y1,bgw,h1);

	/// Industrialization ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[7]; // b/green
	cxa.fillRect(shapeX[4],y1,shapeW[4],h1);


	/// FUTURE CENTURY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[6]; //dark blue -- actually shows 21st century
	cxa.fillRect(shapeX[3],y1,centuryWidth,h1);

	/// CENTURY MARKER ///
	centuryX = shapeX[3]+(shapeW[3]/2);
	baseMarker(centuryX,shapeA[3],"21st Century",colors[6]);

	/// PAST CENTURY ///
	future = shapeX[0]-shapeX[3]; // future is the width of the past block [skull emoji]
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
	topMarker(bgx,1,"200 years ago",colors[7]);
}

function draw3_6() { ////  AGRICULTURE  ///////

	if (lastFrame<frame) { // FWD
	    dateA = destDateA = 0;

		shapeX[4] = shapeX[5] = shapeX[6] = shapeX[7] = bgx;
		shapeW[7] = bgw;
		//shapeW[4] = shapeX[0] - shapeX[4];
		shapeW[4] = destW[4] = (bgw/1000)*(thisDate.getFullYear()-2000);
		shapeW[5] = shapeW[6] = (shapeW[7]/3);

		tweenSpeed = 5;
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

	/// Rest of 21st century ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[6]; // dark blue
	cxa.fillRect(shapeX[4],y1,shapeW[3],h1);

	/// BLOCK R ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(bgw+(units*2),y1-(units*0.55),units*2,h1+(units*4));


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

function draw6() { ////   HUMANS <-- PERIOD 

	if (lastFrame<frame) { // FWD
		shapeA[8] = 0;
		dateA = destDateA = 0;
		shapeX[8] = bgx;
		shapeW[8] = bgw;
		shapeW[7] = bgw;
		millWidth = shapeW[7]/11.5;
		shapeW[6] = millWidth;
		shapeW[5] = millWidth;

		tweenSpeed = 5;
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

	// destW[7] = (shapeW[8]/100)*0.45;
	destW[7] = shapeW[8]*(12000/300000);
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
	baseMarker(millX,shapeA[9],"Quaternary period",colors[10]);


	/// The first human ///
	cxa.globalAlpha = shapeA[8];
	cxa.fillStyle = colors[10]; //purple
	cxa.fillRect(shapeX[8],y1,shapeW[8],h1);

	/// MARKER ///
	// millX = (shapeX[8]-shapeW[7])+(shapeW[8]/2);
	// baseMarker(millX,shapeA[8],"Pleistocene epoch",colors[10]);

	/// HOLO ///
	cxa.globalAlpha = shapeA[7];
	cxa.fillStyle = colors[7];
	cxa.fillRect(shapeX[7],y1,shapeW[7],h1);

	/// MARKER ///
	millX = shapeX[7]+(shapeW[7]/2);
	baseMarker(millX,shapeA[7],"Agriculture",colors[7]);




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
	topMarker(centuryX,dateA,"300,000 years ago",colors[10]);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);
}

function draw4() { // //  mammal lifespan <-- MILLENIUM  /////////

    if (lastFrame<frame) { // FWD

		tweenSpeed = 5;
		dateA = destDateA = 1;
		destW[8] = 0.2*bgw; // it expands from 0 to bgw
		shapeX[8] = bgx; // where it starts before animation
		 
		destA[8] = 1;
		
		tweenSpeed = 5;

	}
	if (lastFrame>frame) { // BK
		shapeW[4] = destW[4] = (bgw/1000)*(thisDate.getFullYear()-2000);
		destA[0] = 1;
		tweenSpeed = 5;
	}
	lastFrame = frame;

	destA[7] = 0;
	destA[6] = 1;
	destA[5] = 0;

	destW[6] = shapeW[8] * (12/300)
	destX[6] = shapeX[0] - shapeW[6] - shapeW[1];




	//2nd
	// shapeX[6] = shapeX[4]-shapeW[6];
	// destW[6] = bgw;

	//1st
	shapeX[5] = shapeX[6]-shapeW[5];
	destW[5] = bgw;



	var centuryWidth = shapeW[4]/10; 
	// total becomes 1M
	destX[3] = shapeX[3] = shapeX[4];
	destW[3] = centuryWidth;

	var yearWidth = shapeW[3]/100;
	destX[2] = shapeX[3]+((thisDate.getFullYear()-2000)*yearWidth);
	destW[2] = yearWidth;

	var monthWidth = shapeW[2]/12;
	shapeX[1] = shapeX[2]+(thisDate.getMonth()*monthWidth);
	destW[1] = monthWidth;


	var dayWidth = shapeW[1]/monthDays[thisDate.getMonth()];
	shapeX[0] = shapeX[8]+shapeW[8] + (thisDate.getDate()*dayWidth);
	destW[0] = dayWidth;


	shapeW[7] = shapeX[0]-bgx;

	shapeX[3] = bgx;

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



	OFFSET = bgw/5;


	/// time since first human ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[10]; // purple
	cxa.fillRect(shapeX[8],y1,shapeW[8],h1);

	/// Industrialization ///
	cxa.globalAlpha = 1;	
	cxa.fillStyle = colors[7]; // b/green
	cxa.fillRect(shapeX[0],y1,-shapeW[6],h1);

	/// YEAR ///
	// future = shapeX[0]-shapeX[2];
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3]; //red (rose)
	shapeX[2] = bgx + bgw/5;
	cxa.fillRect(shapeX[0],y1,-shapeW[2],h1);

	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));


	/// DAY ///
	shapeA[0] = 1;
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	destX[0] = bgx + bgw/5;
	cxa.fillRect(shapeX[0],y1,dayWidth,h1);

	/// DATE MARKER ///
	topMarker(bgx,dateA,"300,000 years ago",colors[10]);
}

function draw6_5(){ // Cambrian explosion
	if (lastFrame<frame) { // FWD
		dateA = destDateA = 1;
		shapeX[9] = bgx;	
		// shapeW[11] = shapeW[10] = shapeW[9] = bgw;
		tweenSpeed = 3;

		//new
		shapeW[9] = shapeW[10] = 0;
		shapeX[9] = shapeX[10]= bgx;

		destW[9] = (bgw/538)*200;
	    destW[10] = bgw;
		destW[8] = 0; // it shrink from og to 0

		shapeW[12] = bgw*20;
		destW[12] = bgw;
		shapeX[12] = (fullX-shapeW[12]) - (units*2);

		shapeA[8] = shapeA[6] = 1;	
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
		tweenSpeed = 3;
	}
	lastFrame = frame;

	destA[6] = 1;
	destA[8] = 1;
	destA[9] = 1;
	destA[10] = 1;
	destA[11] = 0;
	destA[12] = 0;
	destA[13] = 0;
	destA[14] = 0;

	// the stuff from the last frame that is getting phased out
		
	shapeW[8] = bgx + bgw - (shapeX[9] + shapeW[9]); // gap between end of mammal and end of line
	shapeX[8] = bgx;

	shapeW[6] = shapeW[8] * (12/200)
	destX[6] = shapeX[0] - shapeW[6] - shapeW[1];


	shapeX[12] = (fullX-shapeW[12]) - (units*2);
    shapeX[13] = shapeX[12]-shapeW[13];
	
	shapeW[14] = (bgw)*(539/4500)
	shapeX[14] = shapeX[13]-shapeW[14];

	// Mammals (200 Myr ago)
	//destW[9] = (bgw/100)*5;
	shapeA[9] = 1;
	shapeW[9] = (shapeW[10]/538)*200;
	shapeX[9] = shapeX[0]-shapeW[9];

	// Cambrian explosion <-- Dinosaurs
	// destW[10] = bgw; // 538.8 Myr
	destX[10] = bgx;

	//shapeW[11] = bgw - (destW[10]+destW[9]);
	shapeW[11] = bgw - (shapeW[10]);
	shapeX[11] = bgx;

	

	destA[8] = 0;
	destA[7] = 0;

	//first humans
	// shapeW[8] = (shapeW[9]/100)*99.55;
	shapeA[8] = 1;
	shapeW[8] = 1;
	shapeX[8] = shapeX[0] - shapeW[8];

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


	/// Earth is born <- PALEOGENE ///
	cxa.globalAlpha = shapeA[11];
	cxa.fillStyle = colors[13]; //red
	cxa.fillRect(shapeX[11],y1,shapeW[11],h1);
	/// MARKER ///
	// millX = shapeX[11]+(shapeW[11]/2);
	// baseMarker(millX,shapeA[11],"Paleogene period",colors[13]);

	/// Cambrian explosion <-- NEOGENE ///
	cxa.globalAlpha = shapeA[10];
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[10],y1,shapeW[10],h1);
	/// MARKER ///
	// millX = shapeX[10]+(shapeW[10]/2);
	// baseMarker(shapeX[10],shapeA[10],"Cambrian explosion",colors[12]);

	// /// mammals < --QUATERNARY ///
	cxa.globalAlpha = shapeA[9];
	cxa.fillStyle = colors[16]; 
	cxa.fillRect(shapeX[9],y1,shapeW[9],h1);
	// /// MARKER ///
	millX = shapeX[9]+(shapeW[9]/2);
	baseMarker(millX,shapeA[9],"Mammals",colors[16]);

	/// first human <-- PLEIS ///
	shapeA[8] = 1;
	cxa.globalAlpha = shapeA[8];
	cxa.fillStyle = colors[10];
	cxa.fillRect(shapeX[0],y1,-shapeW[8],h1);

	
	/// DATE MARKER ///
	centuryX = bgx;
	topMarker(centuryX,shapeA[10],"538.8 million years ago",colors[12]);
	

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,1,h1);
}

function draw7() { ////  Earth forms <-- ERA ////

	if (lastFrame<frame) { // FWD
		dateA = destDateA = 0;
		shapeX[9] = bgx;
		shapeW[11] = shapeW[10] = shapeW[9] = bgw;
		tweenSpeed = 3;

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
		tweenSpeed = 5;
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

	// Mammals (200 Myr ago)
	//destW[9] = (bgw/100)*5;
	shapeA[9] = 1;
	destW[9] = (shapeW[10]/538)*200;
	shapeX[9] = shapeX[0]-shapeW[9];

	// Cambrian explosion <-- Dinosaurs
	//destW[10] = (bgw/100)*30;
	//shapeW[10] = (shapeW[12]/100)*30;
	shapeW[10] =  (bgw)*(539/4500); // 538.8 Myr
	shapeX[10] = bgx+bgw - shapeW[10];

	//shapeW[11] = bgw - (destW[10]+destW[9]);
	shapeW[11] = bgw - (shapeW[10]);
	shapeX[11] = bgx;



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


	/// Earth is born <- PALEOGENE ///
	cxa.globalAlpha = shapeA[11];
	cxa.fillStyle = colors[13]; //red
	cxa.fillRect(shapeX[11],y1,shapeW[11],h1);
	/// MARKER ///
	// millX = shapeX[11]+(shapeW[11]/2);
	// baseMarker(millX,shapeA[11],"Paleogene period",colors[13]);

	/// Cambrian explosion <-- NEOGENE ///
	cxa.globalAlpha = shapeA[10];
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[10],y1,shapeW[10],h1);
	/// MARKER ///
	millX = shapeX[10]+(shapeW[10]/2);
	baseMarker(shapeX[10],shapeA[10],"Cambrian explosion",colors[12]);

	// /// mammals < --QUATERNARY ///
	cxa.globalAlpha = shapeA[9];
	cxa.fillStyle = colors[16]; 
	cxa.fillRect(shapeX[9],y1,shapeW[9],h1);
	// /// MARKER ///
	millX = shapeX[9]+(shapeW[9]/2);
	baseMarker(millX,shapeA[9],"Mammals",colors[16]);

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
	topMarker(centuryX,shapeA[10],"538.8 million years ago",colors[12]);
	/// DATE MARKER ///
	centuryX = shapeX[8];
	topMarker(centuryX,shapeA[8],"2 . 588 million years ago",colors[10]);
	/// DATE MARKER ///
	// centuryX = shapeX[11];
	centuryX = bgx;
	topMarker(centuryX,dateA,"4.5 billion years ago",colors[13]); //red


	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// ? ///
	/*cxa.fillStyle = copyColor;
	cxa.font = headerType+"px PT Sans";
	cxa.fillText("?", fullX-(units*1.4), halfY+(units*0.3));*/
}

function draw8() {  /////   BEGINNING OF THE UNIVERSE <-- EON //////

	if (lastFrame<frame) { // FWD
		cometNo = 6;
		dateA = destDateA = 0;
		focusCol = colors[1];
		lastCol = colors[1];
		shapeX[19] = bgx;
		shapeW[19] = bgw;
		shapeX[11] = bgx;
		shapeW[11] = 0;
		destX[11] = bgx;
		destW[11] = bgw*(13.8/18.3);
		//geo scale
		//shapeW[19] = bgw*8.3;
		//
		tweenSpeed = 3;
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


	// earth forms [19]
	shapeX[19] = shapeX[11] + shapeW[11];
	destW[19] = bgw-destW[11];	

	//cambrian <-- phane
	destW[15] = bgw * (0.54/13.8);
	shapeX[15] = shapeX[0] - shapeW[15]	;
	// mammal <-- proto
	shapeW[16] = shapeW[15]*0.2;
	shapeX[16] = shapeX[0] - shapeW[16];
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

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyPurpleColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// UNI ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[2];
	cxa.fillRect(shapeX[11],y1,shapeW[11],h1);
	/// EARTH ///
	cxa.globalAlpha = shapeA[19];
	cxa.fillStyle = colors[3];
	cxa.fillRect(shapeX[19],y1,shapeW[19],h1);

	/// MARKER ///
	baseMarker2(shapeX[19],shapeA[19],"Earth is born",colors[3]);


	/// cambrian <-- PHANEROZOIC ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	
	/// mammal <- PROTOZOIC ///
	shapeA[16] = 1;
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[16];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	

	/// BLOCK///
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,y1-(units*0.55),units*2,h1+(units*4));
	/// MARKER ///
	baseMarker2(bgx,dateA,"The universe is born",copyColor);
	/// DATE MARKER ///


	topMarker(shapeX[19],1,"4.5 billion years ago",copyColor);
	topMarker(bgx,dateA,"13.8 billion years ago",copyColor);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0];
	cxa.fillRect(shapeX[0],halfY-units,shapeW[0],desth1);



}
function draw9() { // Earth is swallowed/flung

	if (lastFrame<frame) { // FWD
		//universe
		shapeX[2] = bgx; 
		shapeW[2] = bgw;
		destA[2] = 1;

		//earth
		shapeX[1] = shapeX[19];
		shapeW[1] = shapeW[19];
	}
	if (lastFrame>frame) { // BK
		destA[3] = 0;
		yearWidth = bgw/100;
		destX[2] = bgx+((thisDate.getFullYear()-2000)*yearWidth);
		destW[2] = yearWidth;
	}
	lastFrame = frame;

	// Earth
	destX[2] = bgx;
	destW[2] = bgw;

	/*
	Total span = 13.8 + 5 billion yr = 18.8 billion yr = bgw
	*/


	var monthWidth = bgw/12;
	destX[1] = bgx+(thisDate.getMonth()*monthWidth);
	destW[1] = monthWidth;

	shapeX[1] = bgw*(13.8/18.8) // should be where today is
	shapeX[0] = bgw;

	var dayWidth = shapeW[1]/(monthDays[thisDate.getMonth()]);
	shapeX[0] = shapeX[1]+((thisDate.getDate()-1)*dayWidth);
	destW[0] = dayWidth;

	//cambrian <-- phane
	shapeW[15] = bgw * (0.54/13.8);
	shapeX[15] = shapeX[0] - shapeW[15]	;
	// mammal <-- proto
	shapeW[16] = shapeW[15]*0.2;
	shapeX[16] = shapeX[0] - shapeW[16];


	/// BACKGROUND GREY ///	
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// Now til Earth swallowed ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[4]; // dark red
	cxa.fillRect(shapeX[2],y1,shapeW[2],h1);

	/// Universe is born ///
	future = shapeX[1]-shapeX[2]; 
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3]; // bright red
	cxa.fillRect(shapeX[2],y1,future,h1);

	/// since birth of the Earth ///
	future = bgw * (4.5/18.8); // day minus 4.5 billion years
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[1]; // orange
	cxa.fillRect(shapeX[0],y1,-future,h1);
	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0]; //yellow
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	/// cambrian <-- PHANEROZOIC ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	
	/// mammal <- PROTOZOIC ///
	shapeA[16] = 1;
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[21]; 
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);
	

	/// MARKER ///
	topMarker(shapeX[2],1,"13.8 billion years ago",colors[3]);
	baseMarker2(shapeX[2],dateA,"The universe is born",colors[3]);
	topMarker(shapeX[0]-future,1,"4.5 billion years ago",colors[1]);
	baseMarker2(shapeX[0]-future,dateA,"The Earth is born",colors[1]);
	topMarker(bgx+bgw,1,"5 billion years later",colors[4]);
}

// SUN EXPLODES
function draw10() { 
	if (lastFrame<frame) { // FWD
		shapeX[2] = bgx+bgw;
		shapeW[2] = 0;
		destA[2] = 1;
		shapeW[1] = bgx + bgw - destX[1];

		destW[1] = bgw*(5/20.8);// earth swallow
		shapeW[1] = destW[1];
		destW[2] = bgw*(2)/20.8; 
	}
	if (lastFrame>frame) { // BK
		destA[3] = 0;
		yearWidth = bgw/100;
		destX[2] = bgx+((thisDate.getFullYear()-2000)*yearWidth);
		destW[2] = yearWidth;
	}
	lastFrame = frame;

	destX[2] = bgx+bgw;
	// destW[2] = bgw;

	/*
	Total span = 13.8 + 7 billion yr = 20.8 billion yr = bgw
	*/


	// var monthWidth = bgw/12;
	// destX[1] = bgx+(thisDate.getMonth()*monthWidth);
	// destW[1] = monthWidth;

	var dayWidth = 1;

	shapeX[3] = bgx;

	// for Earth swallowed
	//shapeX[2] = shapeX[3] + bgw*(13.8 - 4.5)/20.8;

	// where today is 
	shapeX[1] = shapeX[3] + bgw*(13.8/20.8);
	shapeX[0] = shapeX[1]+((thisDate.getDate()-1)*dayWidth);
	
	
	destW[0] = dayWidth;

	//cambrian <-- phane
	shapeW[15] = bgw * (0.54/13.8);
	shapeX[15] = shapeX[0] - shapeW[15]	;
	// mammal <-- proto
	shapeW[16] = shapeW[15]*0.2;
	shapeX[16] = shapeX[0] - shapeW[16];


	/// BACKGROUND GREY ///	
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	

	/// Universe is born ///
	future = shapeX[3]-shapeX[1]; 
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[3]; // bright red
	cxa.fillRect(shapeX[1],y1,future,h1);

	/// Earth swallowed ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[4]; // dark red
	cxa.fillRect(shapeX[1],y1,shapeW[1],h1);

	/// since birth of the Earth ///
	future = bgw * (4.5/20.8); // day minus 4.5 billion years
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[1]; // orange
	cxa.fillRect(shapeX[0],y1,-future,h1);
	
	/// cambrian <-- PHANEROZOIC ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[12];
	cxa.fillRect(shapeX[15],y1,shapeW[15],h1);
	
	/// mammal <- PROTOZOIC ///
	shapeA[16] = 1;
	cxa.globalAlpha = shapeA[16];
	cxa.fillStyle = colors[21];
	cxa.fillRect(shapeX[16],y1,shapeW[16],h1);

	/// Sun explodes ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[21]; // life green
	cxa.fillRect(shapeX[2],y1,-shapeW[2],h1);

	/// DAY ///
	cxa.globalAlpha = shapeA[0];
	cxa.fillStyle = colors[0]; //yellow
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);


	/// MARKER ///
	topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	baseMarker2(bgx,dateA,"The universe is born",colors[3]);
	topMarker(shapeX[0]-future,1,"4.5 billion years ago",colors[1]);
	baseMarker2(shapeX[0]-future,dateA,"The Earth is born",colors[1]);
	
	topMarker(bgx+bgw,1,"7 billion years later",colors[21]);
	// baseMarker2(bgx,dateA,"The sun explodes",colors[3]);
	topMarker(shapeX[1]+shapeW[1],1,"5 billion years later",colors[4]);
	baseMarker2(shapeX[1]+shapeW[1],dateA,"Sun expands past Earth",colors[4]);
}

// local group
function draw11() { 

	if (lastFrame<frame) { // FWD
		shapeX[3] = shapeX[0];
		destW[3] = bgw;
		destA[3] = 1;

		var byearWidth = bgw/163.8; // billion year width
		destW[1] = 4.5*byearWidth;
		destW[2] = 9.3*byearWidth;
		destX[3] = bgx;
		tweenSpeed = 3;
	}

	// this whole thing needs to be changed
	if (lastFrame>frame) { // BK
		centuryWidth = bgw/10;
		destX[3] = bgx;
		destW[3] = centuryWidth;

		yearWidth = shapeW[3]/100;
		destX[2] = bgx+((thisDate.getFullYear()-2000)*yearWidth);
		destW[2] = yearWidth;

		monthWidth = shapeW[2]/12;
	    destX[1] = shapeX[2]+(thisDate.getMonth()*monthWidth);
	    destW[1] = monthWidth;

		dayWidth = 1;
	    destX[0] = shapeX[1]+(thisDate.getDate()*dayWidth);
	    destW[0] = dayWidth;

		tweenSpeed =5;
	}
	lastFrame = frame;

	shapeX[3] = shapeX[1];

	// Total = 150 + 13.8 = 163.8
	var byearWidth = bgw/163.8; // billion year width
	// destX[2] = bgx;
	// destW[2] = byearWidth; //?

	destX[2] = bgx;
	

	destX[1] = shapeX[2] + 9.3*byearWidth;
	
	destW[1] = 1;

	shapeX[0] = shapeX[1] + shapeW[1];

	shapeA[3] = 1;

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// FUTURE CENTURY ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[20]; // b/purple (latter half of year)
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// sun explode ///
	future = 7*byearWidth;
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[21]; // life green
	cxa.fillRect(shapeX[0],y1,future,h1);

	/// earth swolo ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[4]; // dark red
	cxa.fillRect(shapeX[0],y1,5*byearWidth,h1);

	/// today ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[1]; // yellow
	cxa.fillRect(shapeX[0],y1,1,h1);

	/// earth form ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[1]; //orange
	cxa.fillRect(shapeX[1],y1,shapeW[1],h1);

	/// universe ///
	future = 9.3*byearWidth;
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[3];//red
	cxa.fillRect(shapeX[2],y1,future,h1);


	topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	baseMarker2(bgx,dateA,"The universe is born",colors[3]);
	topMarker(bgx+bgw,1,"150 billion years later",colors[20]);
	baseMarker2(shapeX[0] + 7*byearWidth,dateA,"The Sun explodes",colors[21]);
}

// Reaching the affectable universe
function draw12() {
	if (lastFrame<frame) { // FWD
		shapeX[2] = bgx;
		shapeW[2] = 0;
		
		destX[2] = bgx;
		byearWidth = bgw/163.8;
		destW[2] = 100 * byearWidth;
		tweenSpeed = 2;
	}

	// this whole thing needs to be changed
	if (lastFrame>frame) { // BK
		
	}
	lastFrame = frame;

	// Total = 150 + 13.8 = 163.8 --> 
	var byearWidth = bgw/163.8; // billion year width
	// destX[2] = bgx;
	// destW[2] = 100*byearWidth; 

	// shapeX[2] = bgx;
	// shapeW[2] = 9.3*byearWidth;

	shapeX[1] = shapeX[2] + 9.3*byearWidth;
	shapeW[1] = 4.5*byearWidth;
	destW[1] = 1;

	shapeX[0] = shapeX[1] + shapeW[1];

	shapeA[3] = 1;

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// FUTURE CENTURY ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[20]; // b/purple (latter half of year)
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	// the affectable universe
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[8]; // other purple
	cxa.fillRect(shapeX[2],y1,shapeW[2],h1);

	/// sun explode ///
	future = 7*byearWidth;
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[21]; // life green
	cxa.fillRect(shapeX[0],y1,future,h1);

	/// earth swolo ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[4]; // dark red
	cxa.fillRect(shapeX[0],y1,5*byearWidth,h1);

	/// today ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[1]; // yellow
	cxa.fillRect(shapeX[0],y1,1,h1);

	/// earth form ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[1]; //orange
	cxa.fillRect(shapeX[1],y1,shapeW[1],h1);

	/// universe ///
	future = 9.3*byearWidth;
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[3];//red
	cxa.fillRect(shapeX[2],y1,future,h1);


	topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	baseMarker2(bgx,dateA,"The universe is born",colors[3]);
	topMarker(shapeX[2] + 100*byearWidth,1,"???? years later",colors[8]);
	baseMarker(shapeX[2] + 60*byearWidth,shapeA[3],"Intergalactic travel",colors[8]);
	topMarker(bgx+bgw,1,"150 billion years later",colors[20]);
	baseMarker2(shapeX[0] + 7*byearWidth,dateA,"The Sun explodes",colors[21]);
}

// Length of stelliferous era
// 100 trillion years in the future
function draw13() {
	if (lastFrame<frame) { // FWD
		destX[3] = destX[2] = destX[1] = destX[0] = bgx;
		destW[3] = destW[2] = destW[1] = destW[0] = 0;

		tweenSpeed = 2;

	}

	// this whole thing needs to be changed
	if (lastFrame>frame) { // BK
		
	}
	lastFrame = frame;

	// Total = 100 trillion years
	// 150 billion = 0.15 trillion
	// var tyearWidth = bgw/100; // trillion year width
	// destX[2] = bgx;
	// destW[2] = tyearWidth; //?

	// // today
	// shapeX[0] = bgx + 0.014 * tyearWidth;

	// // local group
	// shapeX[1] = shapeX[0];
	// shapeW[1] = 0.15*tyearWidth;

	// shapeA[3] = 1;

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// stelliferous era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[9]; // light blue
	cxa.fillRect(shapeX[2],y1,bgw,h1);

	/// local group ///
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[20];//b/purple
	cxa.fillRect(shapeX[1],y1,shapeW[1],h1);
	
	// /// universe ///
	// future = 9.3*byearWidth;
	// cxa.globalAlpha = shapeA[1]; 
	// cxa.fillStyle = colors[3];//red
	// cxa.fillRect(shapeX[2],y1,shapeX[2],h1);

	/// today ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[1]; // yellow
	cxa.fillRect(shapeX[0],y1,1,h1);


	// topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	baseMarker2(bgx,1,"Everything that has ever happened",colors[3]);
	// topMarker(shapeX[2] + 100*byearWidth,1,"???? years later",colors[8]);
	// baseMarker(shapeX[2] + 60*byearWidth,shapeA[3],"Intergalactic travel",colors[8]);
	topMarker(bgx+bgw,1,"100 trillion years later",colors[9]);
	// baseMarker2(shapeX[0] + 7*byearWidth,dateA,"The Sun explodes",colors[21]);
}

// Stelliferous era (log scale)
function draw14() {
	if (lastFrame<frame) { // FWD
		
		var logstepWidth = bgw/25; // one power of ten step
		destX[2] = bgx;
		destW[2] = 25*logstepWidth; 

		// today
		destX[0] = bgx + 10 * logstepWidth; // 13.8 billion years
		destW[0] = logstepWidth;

		// local group
		destX[1] = shapeX[0]+9*logstepWidth;
		destW[1] = 11*logstepWidth;

		shapeA[3] = 1;
		
		tweenSpeed = 3;

	}

	// this whole thing needs to be changed
	if (lastFrame>frame) { // BK
		
	}
	lastFrame = frame;

	// // Past: 10 ^ 10 (13.8 billion)
	// // Future: 10 ^ 14 (100 trillion)
	// // Total = 100 trillion years = 10 ^ 14
	// // 150 billion = 0.15 trillion= 10 ^ 11
	// var logstepWidth = bgw/25; // one power of ten step
	// destX[2] = bgx;
	// destW[2] = logstepWidth; //?
	// shapeX[2] = bgx;

	// // today
	// shapeX[0] = bgx + 10 * logstepWidth; // 13.8 billion years
	// shapeW[0] = logstepWidth;

	// // local group
	// shapeX[1] = shapeX[0]+9*logstepWidth;
	// shapeW[1] = 11*logstepWidth;

	// shapeA[3] = 1;

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// stelliferous era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[9]; // light blue
	cxa.fillRect(shapeX[2],y1,shapeW[2],h1);

	/// local group ///
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[20];//b/purple
	cxa.fillRect(shapeX[0],y1,shapeW[1],h1);

	/// today ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[0]; // yellow
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	// past
	future = shapeX[0] - shapeX[2];
	cxa.fillStyle = colors[3]; // red
	cxa.fillRect(shapeX[2],y1,future,h1);


	topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	// baseMarker2(bgx,dateA,"The universe is born",colors[3]);
	topMarker(shapeX[0]+shapeW[1],1,"150 billion years later",colors[20]);
	// baseMarker(shapeX[2] + 60*byearWidth,shapeA[3],"Intergalactic travel",colors[8]);
	topMarker(bgx+bgw,1,"100 trillion years later",colors[9]);
}

// Degenerate Era
function draw15() {
	if (lastFrame<frame) { // FWD
		
		// Past: 10 ^ 10 (13.8 billion)
		// Future: 10 ^ 40
		// Stelliferous: 10 ^ 14
		// Total = 50 units
		// 150 billion = 0.15 trillion= 10 ^ 11
		var logstepWidth = bgw/50; // one power of ten step
		destX[2] = bgx;
		destW[2] = 25*logstepWidth; //?

		// today
		destX[0] = bgx + 10 * logstepWidth; // 13.8 billion years
		destW[0] = logstepWidth;

		// local group
		destX[1] = shapeX[0]+9*logstepWidth;
		destW[1] = 11*logstepWidth;

		// end of stelliferous era (100 Tyr)
		destW[2] = 15*logstepWidth;

		// degenerate era
		destX[3] = destX[2] + destX[2];
		destW[3] = bgx + bgw - destX[3];

		shapeA[3] = 1;
		
		tweenSpeed = 2;

	}

	// this whole thing needs to be changed
	if (lastFrame>frame) { // BK
		
	}
	lastFrame = frame;



	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	/// degen era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[10]; // purple
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// stelliferous era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[9]; // light blue
	cxa.fillRect(shapeX[0],y1,shapeW[2],h1);

	/// local group ///
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[20];//b/purple
	cxa.fillRect(shapeX[0],y1,shapeW[1],h1);

	/// today ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[0]; // yellow
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	// past
	future = shapeX[0] - shapeX[2];
	cxa.fillStyle = colors[3]; // red
	cxa.fillRect(shapeX[2],y1,future,h1);


	topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	// baseMarker2(bgx,dateA,"The universe is born",colors[3]);
	topMarker(shapeX[0]+shapeW[1],1,"150 billion years",colors[20]);
	// baseMarker(shapeX[2] + 60*byearWidth,shapeA[3],"Intergalactic travel",colors[8]); // causes top text to go off the screen
	topMarker(shapeX[0]+shapeW[2],1,"100 trillion years",colors[9]);
	topMarker(shapeX[3]+shapeW[3],1,"10 duodecillion (10e+40) years",colors[10]);
}

// Black hole era
function draw16() {
	if (lastFrame<frame) { // FWD
		
		// Past: 10 ^ 10 (13.8 billion)
		// Future: 10 ^ 100
		// Stelliferous: 10 ^ 14
		// Total = 110 units
		// 150 billion = 0.15 trillion= 10 ^ 11
		var logstepWidth = bgw/110; // one power of ten step
		destX[2] = bgx;
		destW[2] = logstepWidth; //?

		// today
		destX[0] = bgx + 10 * logstepWidth; // 13.8 billion years
		destW[0] = logstepWidth;

		// local group
		destX[1] = destX[0]+9*logstepWidth;
		destW[1] = 11*logstepWidth;

		// end of stelliferous era (100 Tyr)
		destW[2] = 15*logstepWidth;

		// degenerate era
		destX[3] = destX[2] + destW[2];
		destW[3] = 35*logstepWidth;

		shapeA[3] = 1;

		// black hole era
		destX[4] = destX[3] + destW[3];
		destW[4] = 60*logstepWidth;

		shapeA[4] = 1;

		
		tweenSpeed = 3;

	}

	// this whole thing needs to be changed
	if (lastFrame>frame) { // BK
		
	}
	lastFrame = frame;

	
	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	// black hole era ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[19]; // r/purple
	cxa.fillRect(shapeX[4],y1,shapeW[4],h1);

	/// degen era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[10]; // purple
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// stelliferous era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[9]; // light blue
	cxa.fillRect(shapeX[0],y1,shapeW[2],h1);

	/// local group ///
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[20];//b/purple
	cxa.fillRect(shapeX[0],y1,shapeW[1],h1);

	/// today ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[0]; // yellow
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	// past
	future = shapeX[0] - shapeX[2];
	cxa.fillStyle = colors[3]; // red
	cxa.fillRect(shapeX[2],y1,future,h1);


	topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	// baseMarker2(bgx,dateA,"The universe is born",colors[3]);
	topMarker(shapeX[0]+shapeW[1],1,"150 billion",colors[20]);
	// baseMarker(shapeX[2] + 60*byearWidth,shapeA[3],"Intergalactic travel",colors[8]); // causes top text to go off the screen
	topMarker(shapeX[0]+shapeW[2],1,"100 trillion",colors[9]);
	topMarker(shapeX[3]+shapeW[3],1,"10 duodecillion (10e+40) years",colors[10]);
	topMarker(shapeX[4]+shapeW[4],1,"1 googol (10e+100) years",colors[19]);
}

// Dark era
function draw17() {
	if (lastFrame<frame) { // FWD
		destX[4] = destX[3] = destX[2] = destX[1] = destX[0] = bgx;
		destW[4] = destW[3] = destW[2] = destW[1] = destW[0] = 0;

		tweenSpeed = 1;

	}

	// this whole thing needs to be changed
	if (lastFrame>frame) { // BK
		
	}
	lastFrame = frame;

	// Past: 10 ^ 10 (13.8 billion)
	// Future: 10 ^ 100
	// Stelliferous: 10 ^ 14
	// Total = 110 units
	// 150 billion = 0.15 trillion= 10 ^ 11
	// var logstepWidth = bgw/110; // one power of ten step
	// destX[2] = bgx;
	// destW[2] = logstepWidth; //?
	// shapeX[2] = bgx;

	// // today
	// shapeX[0] = bgx; // 13.8 billion years
	// shapeW[0] = logstepWidth;

	// // local group
	// shapeX[1] = shapeX[0]+9*logstepWidth;
	// shapeW[1] = 11*logstepWidth;

	// // end of stelliferous era (100 Tyr)
	// shapeW[2] = 15*logstepWidth;

	// // degenerate era
	// shapeX[3] = shapeX[2] + shapeW[2];
	// shapeW[3] = 35*logstepWidth;

	// shapeA[3] = 1;

	// // black hole era
	// shapeX[4] = shapeX[3] + shapeW[3];
	// shapeW[4] = 60*logstepWidth;

	// shapeA[4] = 1;

	/// GREY ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = greyColor;
	cxa.fillRect(bgx,y1,bgw,h1);

	// black hole era ///
	cxa.globalAlpha = 1;
	cxa.fillStyle = colors[19]; // r/purple
	cxa.fillRect(shapeX[4],y1,shapeW[4],h1);

	/// degen era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[10]; // purple
	cxa.fillRect(shapeX[3],y1,shapeW[3],h1);

	/// stelliferous era ///
	cxa.globalAlpha = shapeA[3];
	cxa.fillStyle = colors[9]; // light blue
	cxa.fillRect(shapeX[2],y1,shapeW[2],h1);

	/// local group ///
	cxa.globalAlpha = shapeA[1]; 
	cxa.fillStyle = colors[20];//b/purple
	cxa.fillRect(shapeX[1],y1,shapeW[1],h1);

	/// today ///
	cxa.globalAlpha = shapeA[2];
	cxa.fillStyle = colors[0]; // yellow
	cxa.fillRect(shapeX[0],y1,shapeW[0],h1);

	// past
	future = shapeX[0] - shapeX[2];
	cxa.fillStyle = colors[3]; // red
	cxa.fillRect(shapeX[2],y1,future,h1);


	// topMarker(bgx,1,"13.8 billion years ago",colors[3]);
	// // baseMarker2(bgx,dateA,"The universe is born",colors[3]);
	// topMarker(shapeX[0]+shapeW[1],1,"150 billion",colors[20]);
	// // baseMarker(shapeX[2] + 60*byearWidth,shapeA[3],"Intergalactic travel",colors[8]); // causes top text to go off the screen
	// topMarker(shapeX[0]+shapeW[2],1,"100 trillion",colors[9]);
	// topMarker(shapeX[3]+shapeW[3],1,"10 duodecillion (10e+40) years",colors[10]);
}

// Then: zoom all the way back to today

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
