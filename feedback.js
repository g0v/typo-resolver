var regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;
var emails = $("body").html().match(regex);
var nl = "%0D%0A";
var recipients = "";

if(emails !== null) {
  recipients = emails;
}else{
  alert("not found any email address, please input some valid email addresses manually.");
}

var subject = "[Typo Resolver] " + document.title + " has some typo";
var body = "Hello" + nl + nl + "Your site has some typo. The attachment has already highlight it." + nl + nl + nl + "from Typo Resolver ( https://chrome.google.com/webstore/detail/kpmhpplainkjokabdbjkfdkohacblnlo ) ";
var img = [];
var arrFun = [];

function scrollToTypo(typo, callback){
  var anim = {scrollTop: typo.y};

  $("body").animate(anim, "fast", "swing", function(){
    callback();
  });
}

function asyncFunction(typo){
  var d = new $.Deferred();

  scrollToTypo(typo, function(){
    chrome.runtime.sendMessage({"action": "capture"}, function(response){
      img.push(response);

      d.resolve();
    });
  });

  return d;
}

arrTypo.forEach(function(typo){
  arrFun.push(asyncFunction(typo));
});

$.when.apply(null, arrFun).then(function(){
  img.forEach(function(i){
    window.open(i);
  });
});
