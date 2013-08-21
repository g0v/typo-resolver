var regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;
var emails = $("body").html().match(regex);
var recipients = "cpckewang@gmail.com";

if(emails.length != 0) {
  recipients = emails;
}

var subject = "[Typo Resolver] " + document.title + " has some typo";
var body = "hello";

html2canvas([document.body], {
  onrendered: function(canvas){
    var img = canvas.toDataURL("image/png");

    window.open(img);

    window.open("mailto:" + recipients + "?subject=" + subject + "&body=" + body);
  }
});
