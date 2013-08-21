var emails = $("a[href^='https://mail.google.com']");
var recipients = "cpckewang@gmail.com";

alert(emails.length);

for(var i=0;i<emails.length;i++){
  console.log(emails[i]);
}

if(emails.length != 0) {
  recipients = emails.get();
}

window.open("mailto:" + recipients + "?subject=test");
