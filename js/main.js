/*
    load an Image
    snapshot the element inwhich the image exists
    append the canvas to the body
    process
*/
var __canvas = document.querySelector('#stage');
var __stage;
var __cat, __catctx;

var __content = document.querySelector('.content');

var catImage = new Image();

var canvasDivider;

catImage.onload = function(){
    html2canvas(__content, {
        onrendered: function(canvas) {
            __cat = canvas;
            __catctx = canvas.getContext("2d");
        }
    });
};
catImage.src = "img/thegame.jpg";

//go button
$('.gobtn').click(function(e){
    setTimeout(function(){
        init();
    }, 0);

    $(this).hide();
});



//shapes for testing
//as generated by http://codepen.io/cmndo/pen/oXoZGo

var shapePercs = [[{"x":0.0014285714285714286,"y":0},{"x":0.12142857142857143,"y":0},{"x":0.002857142857142857,"y":0.355}],[{"x":0.12142857142857143,"y":0.0025},{"x":0.16857142857142857,"y":0.0025},{"x":0.0014285714285714286,"y":0.51},{"x":0.0014285714285714286,"y":0.3525}],[{"x":0.17142857142857143,"y":0.0025},{"x":0.26857142857142857,"y":0.0025},{"x":0.0014285714285714286,"y":0.8125},{"x":0.004285714285714286,"y":0.5075}],[{"x":0.26857142857142857,"y":0},{"x":0.29428571428571426,"y":0.0025},{"x":0.0014285714285714286,"y":0.8725},{"x":0.0014285714285714286,"y":0.81}],[{"x":0.29714285714285715,"y":0},{"x":0.3457142857142857,"y":0},{"x":0.011428571428571429,"y":0.9975},{"x":0.0014285714285714286,"y":0.9975},{"x":0.004285714285714286,"y":0.8775}],[{"x":0.3442857142857143,"y":0},{"x":0.4142857142857143,"y":0},{"x":0.08428571428571428,"y":0.995},{"x":0.01,"y":0.995}],[{"x":0.4157142857142857,"y":0},{"x":0.48428571428571426,"y":0},{"x":0.15714285714285714,"y":0.995},{"x":0.08428571428571428,"y":0.995}],[{"x":0.48714285714285716,"y":0},{"x":0.64,"y":0.0025},{"x":0.3057142857142857,"y":0.9975},{"x":0.15714285714285714,"y":0.9975}],[{"x":0.64,"y":0},{"x":0.77,"y":0},{"x":0.44,"y":0.995},{"x":0.30857142857142855,"y":0.995}],[{"x":0.7685714285714286,"y":0},{"x":0.85,"y":0.0025},{"x":0.5228571428571429,"y":0.9975},{"x":0.44,"y":0.9925}],[{"x":0.8528571428571429,"y":0},{"x":0.91,"y":0},{"x":0.58,"y":0.995},{"x":0.5228571428571429,"y":0.9975}],[{"x":0.91,"y":0},{"x":0.9971428571428571,"y":0.0025},{"x":0.9971428571428571,"y":0.0175},{"x":0.67,"y":0.995},{"x":0.58,"y":0.995}],[{"x":0.9985714285714286,"y":0.02},{"x":0.9985714285714286,"y":0.0525},{"x":0.6857142857142857,"y":0.9975},{"x":0.67,"y":0.9975}],[{"x":0.9985714285714286,"y":0.0525},{"x":0.9985714285714286,"y":0.11},{"x":0.7071428571428572,"y":0.9975},{"x":0.6857142857142857,"y":0.9975}],[{"x":0.9985714285714286,"y":0.1075},{"x":0.9971428571428571,"y":0.4175},{"x":0.8085714285714286,"y":0.9975},{"x":0.7057142857142857,"y":0.9975}],[{"x":0.9971428571428571,"y":0.4175},{"x":0.9985714285714286,"y":0.995},{"x":0.8085714285714286,"y":0.9975}]];

var shapes = [];//[[{"x":2,"y":0},{"x":170,"y":0},{"x":4,"y":284}],[{"x":170,"y":2},{"x":236,"y":2},{"x":2,"y":408},{"x":2,"y":282}],[{"x":240,"y":2},{"x":376,"y":2},{"x":2,"y":650},{"x":6,"y":406}],[{"x":376,"y":0},{"x":412,"y":2},{"x":2,"y":698},{"x":2,"y":648}],[{"x":416,"y":0},{"x":484,"y":0},{"x":16,"y":798},{"x":2,"y":798},{"x":6,"y":702}],[{"x":482,"y":0},{"x":580,"y":0},{"x":118,"y":796},{"x":14,"y":796}],[{"x":582,"y":0},{"x":678,"y":0},{"x":220,"y":796},{"x":118,"y":796}],[{"x":682,"y":0},{"x":896,"y":2},{"x":428,"y":798},{"x":220,"y":798}],[{"x":896,"y":0},{"x":1078,"y":0},{"x":616,"y":796},{"x":432,"y":796}],[{"x":1076,"y":0},{"x":1190,"y":2},{"x":732,"y":798},{"x":616,"y":794}],[{"x":1194,"y":0},{"x":1274,"y":0},{"x":812,"y":796},{"x":732,"y":798}],[{"x":1274,"y":0},{"x":1396,"y":2},{"x":1396,"y":14},{"x":938,"y":796},{"x":812,"y":796}],[{"x":1398,"y":16},{"x":1398,"y":42},{"x":960,"y":798},{"x":938,"y":798}],[{"x":1398,"y":42},{"x":1398,"y":88},{"x":990,"y":798},{"x":960,"y":798}],[{"x":1398,"y":86},{"x":1396,"y":334},{"x":1132,"y":798},{"x":988,"y":798}],[{"x":1396,"y":334},{"x":1398,"y":796},{"x":1132,"y":798}]];


function getBounds(points){
    // find the boundary that makes up the shape
    var sx, sy, lx, ly;

    for(var i = 0; i < points.length; i++){
        //find the smallests
        if(points[i].x < sx || sx === undefined){
            sx = points[i].x;
        }
        if(points[i].y < sy || sy === undefined){
            sy = points[i].y;
        }
        //find the biggest
        if(points[i].x > lx || lx === undefined){
            lx = points[i].x;
        }
        if(points[i].y > ly || ly === undefined){
            ly = points[i].y;
        }
        //now we should have a set of boundaries
    }

    return {
        x: sx,
        y: sy,
        width: lx - sx,
        height: ly - sy
    }
}

//class for handling the canvas split
function CanvasDivider(){


    this.slice = function( currShape, alternate, delay ){
        //1. create faux canvas the same size as the screenshot
        var tempCanvas = document.createElement("canvas");
        tempCanvas.height = __cat.height;
        tempCanvas.width = __cat.width;



        //2. draw your clipping mask on it
        var ctx = tempCanvas.getContext("2d");

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(shapes[currShape][0].x, shapes[currShape][0].y);
        for(i = 0; i < shapes[currShape].length; i++){
            ctx.lineTo(shapes[currShape][i].x, shapes[currShape][i].y);
        }
        ctx.closePath();
        ctx.clip();

        //3. put your image on the clipping mask
        ctx.drawImage(__cat, 0, 0);
        ctx.restore();

        //4. get image data of the bounding box
        var bounds = getBounds(shapes[currShape]);
        var imageData = ctx.getImageData(bounds.x,bounds.y,bounds.width,bounds.height);


        //5. paste it into a createjs bitmap
        var bmpCanvas = document.createElement("canvas");
        bmpCanvas.width = bounds.width;
        bmpCanvas.height = bounds.height;

        var bmpCtx = bmpCanvas.getContext("2d");
        bmpCtx.putImageData(imageData, 0, 0);
        var bmp = new createjs.Bitmap(bmpCanvas);
        bmp.x = bounds.x;
        bmp.y = bounds.y;

        console.log("frog");

        //6. Add to stage
        __stage.addChild(bmp);

        //7. update stage
        __stage.update();


        console.log("at least i know it finished processing this block");


        if(alternate){
            TweenLite.to(bmp, 5, {delay: delay, x: bounds.x + (tempCanvas.height / 2), y:bounds.y - tempCanvas.height, /*rotation: -70,*/ onUpdate:__stage.update, onUpdateScope:__stage, ease: Expo.easeInOut} );
        }else{
            TweenLite.to(bmp, 5, {delay: delay, x: bounds.x - (tempCanvas.height / 2), y:bounds.y + tempCanvas.height, /*rotation: 70,*/ onUpdate:__stage.update, onUpdateScope:__stage, ease: Expo.easeInOut} );
        }

    }
}

function init(){
    __stage = new createjs.Stage("stage");

	//figure out the shapes from the percentages -- Genius !!!!

	var $content = $(__content);
	__canvas.width = $content.width();
	__canvas.height = $content.height();

	for (var i = 0; i < shapePercs.length; i++){
		//
		var tmpShape = [];
		for(var j = 0; j < shapePercs[i].length; j++){
			tmpShape.push({
				x: shapePercs[i][j].x * $content.width(),
				y: shapePercs[i][j].y * $content.height()
			});
		}
		shapes.push(tmpShape);

	}



	// -

	canvasDivider = new CanvasDivider();

    for(i = 0; i < shapes.length; i++){

        canvasDivider.slice(i, (i%2==0), Math.random() * (shapes.length * .01));

    }

    //put the effect in place of the element
    var $effect = $(__canvas);
    $effect.css({
        top: 0,
        left: 0,
        display: "block"
    });

    var $content = $(__content);
    $content.hide();

}
