/*
    load an Image
    snapshot the element inwhich the image exists
    append the canvas to the body
    process
*/
var __canvas = document.querySelector('#stage');
var __stage;
var __cat,__catctx;

var __content = document.querySelector('.content');

var catImage = new Image();

var canvasDivider;

catImage.onload = function(){
    html2canvas(__content, {
        onrendered: function(canvas) {
            __cat = canvas;
            __catctx = canvas.getContext("2d");
            document.body.appendChild(canvas);
            init();
        }
    });
};
catImage.src = "img/300.jpg"

//shapes for testing

var shapes = [
    [
        {"x":2,"y":0},
        {"x":53,"y":0},
        {"x":1,"y":102}
    ],
    [
        {"x":54,"y":2},
        {"x":108,"y":0},
        {"x":19,"y":174},
        {"x":1,"y":174},
        {"x":2,"y":102}
    ],
    [
        {"x":109,"y":0},
        {"x":180,"y":0},
        {"x":92,"y":174},
        {"x":18,"y":174}
    ],
    [
        {"x":180,"y":0},
        {"x":261,"y":0},
        {"x":171,"y":174},
        {"x":93,"y":174}
    ],
    [
        {"x":261,"y":1},
        {"x":347,"y":1},
        {"x":259,"y":174},
        {"x":172,"y":174}
    ],
    [
        {"x":348,"y":1},
        {"x":434,"y":2},
        {"x":346,"y":174},
        {"x":260,"y":174}
    ],
    [
        {"x":434,"y":1},
        {"x":500,"y":1},
        {"x":413,"y":173},
        {"x":345,"y":173}
    ],
    [
        {"x":501,"y":1},
        {"x":538,"y":1},
        {"x":538,"y":44},
        {"x":473,"y":174},
        {"x":414,"y":172}
    ],
    [
        {"x":538,"y":44},
        {"x":537,"y":174},
        {"x":473,"y":174}
    ]
];

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



    this.slice = function(){



        //1. create faux canvas the same size as the screenshot
        var fragment = document.createElement("canvas");
        fragment.height = __cat.height;
        fragment.width = __cat.width;



        //2. draw your clipping mask on it
        var fctx = fragment.getContext("2d");
        var currShape = 1;
        var bounds = getBounds(shapes[currShape]);


        fctx.save();
        fctx.beginPath();
        fctx.moveTo(shapes[currShape][0].x, shapes[currShape][0].y);
        for(i = 0; i < shapes[currShape].length; i++){
            fctx.lineTo(shapes[currShape][i].x, shapes[currShape][i].y);
        }
        fctx.closePath();
        fctx.lineWidth = 2;
        fctx.stroke();
        fctx.clip();
        fctx.restore();

        //3. put your image on the clipping mask

        var clipBounds = __catctx.getImageData(0,0, __cat.width, __cat.height)
        fctx.putImageData(clipBounds, 0, 0);


        //4. get image data of the bounding box
        var imageData = fctx.getImageData(bounds.x,bounds.y,bounds.width,bounds.height);


        //5. paste it into a createjs bitmap
        var tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = bounds.width;
        tmpCanvas.height = bounds.height;

        var tmpCtx = tmpCanvas.getContext("2d");
        tmpCtx.putImageData(imageData, 0, 0);
        var bmp = new createjs.Bitmap(tmpCanvas);

        console.log("frog");

        //6. Add to stage
        __stage.addChild(bmp);

        //7. update stage
        __stage.update();


        console.log("at least i know it finished processing this block");
    }
}

function init(){
    __stage = new createjs.Stage("stage");
    canvasDivider = new CanvasDivider();
    canvasDivider.slice();

}
