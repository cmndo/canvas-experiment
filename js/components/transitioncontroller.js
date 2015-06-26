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
            for (var i = 0; i < _shapes.length; i++){
        		//loop through points and build shapes based on the size we have
        		var tmpShape = [];
        		for(var j = 0; j < _shapes[i].length; j++){
        			tmpShape.push({
        				x: _shapes[i][j].x * w,
        				y: _shapes[i][j].y * h
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
        $canvas = $(__canvas);
        __stage = new createjs.Stage(__canvas),
        resizeCanvas = function(){
            __canvas.width = $doc.width();
            __canvas.height = $doc.height();
        };

    // construct
    $canvas.addClass("tc-stage");
    resizeCanvas();
    $win.resize(resizeCanvas);

    

    // api
    return {
        getCanvas: function(){
            return __canvas;
        },
        setTCO: function( tco ){
            _tco = tco;
        },
        activeView: function(element){

        },
        changeView: function(element, options){
            options = options || {
                backward: false
            };
            //do something to the query object
            var $elem = $(element);

            //get the shapes that will fit the screen dimensions
            var shapes = tco.getScaledShapes($doc.width(), $doc.height());
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
