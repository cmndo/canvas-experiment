var tco = new TransitionConfigurationInstance();
tco.setShapes(1400, 800, [
    [{
        "x": 2,
        "y": 0
    }, {
        "x": 170,
        "y": 0
    }, {
        "x": 4,
        "y": 284
    }],
    [{
        "x": 170,
        "y": 2
    }, {
        "x": 236,
        "y": 2
    }, {
        "x": 2,
        "y": 408
    }, {
        "x": 2,
        "y": 282
    }],
    [{
        "x": 240,
        "y": 2
    }, {
        "x": 376,
        "y": 2
    }, {
        "x": 2,
        "y": 650
    }, {
        "x": 6,
        "y": 406
    }],
    [{
        "x": 376,
        "y": 0
    }, {
        "x": 412,
        "y": 2
    }, {
        "x": 2,
        "y": 698
    }, {
        "x": 2,
        "y": 648
    }],
    [{
        "x": 416,
        "y": 0
    }, {
        "x": 484,
        "y": 0
    }, {
        "x": 16,
        "y": 798
    }, {
        "x": 2,
        "y": 798
    }, {
        "x": 6,
        "y": 702
    }],
    [{
        "x": 482,
        "y": 0
    }, {
        "x": 580,
        "y": 0
    }, {
        "x": 118,
        "y": 796
    }, {
        "x": 14,
        "y": 796
    }],
    [{
        "x": 582,
        "y": 0
    }, {
        "x": 678,
        "y": 0
    }, {
        "x": 220,
        "y": 796
    }, {
        "x": 118,
        "y": 796
    }],
    [{
        "x": 682,
        "y": 0
    }, {
        "x": 896,
        "y": 2
    }, {
        "x": 428,
        "y": 798
    }, {
        "x": 220,
        "y": 798
    }],
    [{
        "x": 896,
        "y": 0
    }, {
        "x": 1078,
        "y": 0
    }, {
        "x": 616,
        "y": 796
    }, {
        "x": 432,
        "y": 796
    }],
    [{
        "x": 1076,
        "y": 0
    }, {
        "x": 1190,
        "y": 2
    }, {
        "x": 732,
        "y": 798
    }, {
        "x": 616,
        "y": 794
    }],
    [{
        "x": 1194,
        "y": 0
    }, {
        "x": 1274,
        "y": 0
    }, {
        "x": 812,
        "y": 796
    }, {
        "x": 732,
        "y": 798
    }],
    [{
        "x": 1274,
        "y": 0
    }, {
        "x": 1396,
        "y": 2
    }, {
        "x": 1396,
        "y": 14
    }, {
        "x": 938,
        "y": 796
    }, {
        "x": 812,
        "y": 796
    }],
    [{
        "x": 1398,
        "y": 16
    }, {
        "x": 1398,
        "y": 42
    }, {
        "x": 960,
        "y": 798
    }, {
        "x": 938,
        "y": 798
    }],
    [{
        "x": 1398,
        "y": 42
    }, {
        "x": 1398,
        "y": 88
    }, {
        "x": 990,
        "y": 798
    }, {
        "x": 960,
        "y": 798
    }],
    [{
        "x": 1398,
        "y": 86
    }, {
        "x": 1396,
        "y": 334
    }, {
        "x": 1132,
        "y": 798
    }, {
        "x": 988,
        "y": 798
    }],
    [{
        "x": 1396,
        "y": 334
    }, {
        "x": 1398,
        "y": 796
    }, {
        "x": 1132,
        "y": 798
    }]
]);

var tc = new TransitionController( tco );
tc.activeView(document.querySelector(".home-section")); //pull this element out and put it in the active view container

//implement transition with a 2000 ms timeout
setTimeout(function(){

    tc.changeView(document.querySelector(".work-section"), {
        backward: false
    });

    //lets try another one
    setTimeout(function(){

        tc.changeView(document.querySelector(".home-section"), {
            backward: true
        });

    }, 4000);

}, 2000);

//append this TransitionController's canvas element to the body
document.body.appendChild(tc.getCanvas());

console.log("Done with app.js");
