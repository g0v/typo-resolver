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
    var img = canvas.toDataURL("image/png");

    window.open(img);

    window.open("mailto:" + recipients + "?subject=" + subject + "&body=" + body);
  }
});
