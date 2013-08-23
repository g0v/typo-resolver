var regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;
var emails = $("body").html().match(regex);
var recipients = "";

if(emails !== null) {
  recipients = emails;
}else{
  alert("not found any email address, please input some valid email addresses manually.");
}

var subject = "[Typo Resolver] " + document.title + " has some typo";
var body = "Hello, your site has some typo. The attachment has already highlight it.";

html2canvas([document.body], {
  onrendered: function(canvas){
    var ctx=canvas.getContext('2d');

    ctx.globalAlpha=0.5;
    // setup text for filling
    ctx.font = "72px Comic Sans MS" ;
    ctx.fillStyle = "red";
    // get the metrics with font settings
    var metrics = ctx.measureText("Typo Resolver");
    var width = metrics.width;
    // height is font size
    var height = 72;
    // change the origin coordinate to the middle of the context
    ctx.translate(canvas.width/2, canvas.height/2);
    // rotate the context (so it's rotated around its center)
    ctx.rotate(-Math.atan(canvas.height/canvas.width));
    // as the origin is now at the center, just need to center the text
    ctx.fillText("Typo Resolver",-width/2,height/2);

    var img = canvas.toDataURL("image/png");

    window.open(img);

    window.open("mailto:" + recipients + "?subject=" + subject + "&body=" + body);
  }
});
