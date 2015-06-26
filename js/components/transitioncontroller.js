var utils = {
    getBounds: function(points){
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
}
function TransitionConfigurationInstance(){
    var _w,
        _h,
        _shapes,
        _percentages,
        _scaledshapes;

    return {
        setShapes: function(width, height, shapes) {
            //set shape sizes for further calculations
            _w = width;
            _h = height;
            _shapes = shapes;

            //generate percentages
            _percentages = [];
            for (var i = 0, tmpShape; i < _shapes.length; i++){
                tmpShape = [];
                for(var j = 0; j <_shapes[i].length; j++){
                    tmpShape.push({
                        x: _shapes[i][j].x / _w,
                        y: _shapes[i][j].y / _h
                    });
                }
                _percentages.push(tmpShape);
            }
        },
        getScaledShapes: function(w, h){
            // _scaledshapes
            _scaledshapes = []
            for (var i = 0; i < _percentages.length; i++){
        		//loop through points and build shapes based on the size we have
        		var tmpShape = [];
        		for(var j = 0; j < _percentages[i].length; j++){
        			tmpShape.push({
        				x: _percentages[i][j].x * w,
        				y: _percentages[i][j].y * h
        			});
        		}
        		_scaledshapes.push(tmpShape);
        	}
            return _scaledshapes;
        }
    }
}
function TransitionController( tco ){
    //declare
    var _tco = tco,
        $win = $(window),      //   This class
        $doc = $(document),   //    has a whole lot of
        $bod = $('body'),    //     control
        __canvas = document.createElement("canvas"),
        $canvas = $(__canvas),
        $activeContentContainer = $('.active-content'),
        $stagedContentContainer = $('.staged-content'),
        shapes,__cat,__catctx;

        __stage = new createjs.Stage(__canvas),
        resizeCanvas = function(){
            __canvas.width = $doc.width();
            __canvas.height = $doc.height();
        };

    // construct
    $canvas.addClass("tc-stage");
    resizeCanvas();
    $win.resize(resizeCanvas);

    //nitty gritty adapted from main.js
    function beginTransition(canvas, isBackward) {
        $canvas.show();

        //build shapes for the current screen size
        shapes = tco.getScaledShapes($doc.width(), $doc.height());
        __cat = canvas,
        __catctx = canvas.getContext("2d");


        for(var i = 0; i < shapes.length; i++){
            slice(i, (i%2==0), (.05 * i) + Math.random() * (shapes.length * .01));
        }
    }
    function slice( currShape, alternate, delay ){
        console.log("slice called")
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
        var bounds = utils.getBounds(shapes[currShape]);
        var imageData = ctx.getImageData(bounds.x,bounds.y,bounds.width,bounds.height);

        console.log(bounds);


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


        if(alternate){
            TweenLite.to(bmp, 1.33, {delay: delay, x: bounds.x + (tempCanvas.height / 2), y:bounds.y - tempCanvas.height, /*rotation: -70,*/ onUpdate:__stage.update, onUpdateScope:__stage, ease: Quad.easeIn} );
        }else{
            TweenLite.to(bmp, 1.33, {delay: delay, x: bounds.x - (tempCanvas.height / 2), y:bounds.y + tempCanvas.height, /*rotation: 70,*/ onUpdate:__stage.update, onUpdateScope:__stage, ease: Quad.easeIn} );
        }
        console.log("at least i know it finished processing this block");
    }//end slice

    // api
    return {
        getCanvas: function(){
            return __canvas;
        },
        setTCO: function( tco ){
            _tco = tco;
        },
        activeView: function(element){
            $activeContentContainer.html(element);
        },
        changeView: function(element, options){
            options = options || {
                backward: false
            };
            //do something to the query object
            var $elem = $(element);

            //place the next content into it's staging container
            $stagedContentContainer.html(element);

            //take a screenshot of the activeContentContainer
            html2canvas($activeContentContainer[0], {
                onrendered: function(canvas) {

                    //The Magic starts right here.
                    beginTransition(canvas, options.backwards);
                }
            });
        }

    }

}


/*
    It's implementation I see like this

    var tco = new transitionConfigurationInstance();
    tco.setShapes(1400,800,[[]]);

    var tc = new TransitionController( tco );
    tc.activeView(document.querySelector(".home-section"));
    tc.changeView(document.querySelector(".work-section"), {
        backward: true
    });
*/
