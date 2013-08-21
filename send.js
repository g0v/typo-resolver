var mails = $("a[href^='mailto:']");

alert(mails.length);

if(mails.length!=0) {
  var recipients=mails.get();

  window.open("mailto:" + recipients  + "?subject=test");
} else {
  window.open("mailto:cpckewang@gmail.com?subject=test");
}
