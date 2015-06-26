function TransitionConfigurationInstance(){
    var _w, _h, _shapes, _percentages, _scaledshapes;

    return {
        setShapes: function(width, height, shapes) {
            //generate a set of percentages to use instead
            _w = width;
            _h = height;
            _shapes = shapes;

            //generate percentages
            for (var i = 0, tmpShape; i < _shapes.length; i++){
                tmpShape = [];
                for(var j = 0; j <shapes[i].length; j++){
                    tmpShape.push({
                        x: shapes[i][j].x / _w,
                        y: shapes[i][j].y / _h
                    });
                }
                _percentages.push(tmpShape);
            }
        },
        getShapePercentages: function(){
            // _scaledshapes
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
        }
    }
}
function TransitionController( tco ){
    var _tco = tco;

    //keep track of window resizing.
    var $win = $(window),
        $doc = $(document);

    return {
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
            var $query = $(query);

            //get the shapes that will fit the screen's
            var shapes = tco.getShapePercentages($doc.width(), $doc.height());




        }
    };

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
