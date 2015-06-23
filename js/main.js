var __content = document.querySelector('.content');
var catImage = new Image();
catImage.onload = function(){
  html2canvas(__content, {
    onrendered: function(canvas) {
        document.body.appendChild( canvas );
    }
});
}
catImage.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/300.jpg"
