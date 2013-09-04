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
var arrData = [];
var arrFun = [];
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasHeight = 0;

function scrollToWithTypo(typo, callback){
  var anim = {scrollTop: typo.y};

  $("body").animate(anim, "fast", "swing", function(){
    callback();
  });
}

function screenshot(typo){
  var d = new $.Deferred();

  scrollToWithTypo(typo, function(){
    chrome.runtime.sendMessage({"action": "capture"}, function(response){
      arrData.push(response);

      d.resolve();
    });
  });

  return d;
}

arrTypo.forEach(function(typo){
  arrFun.push(screenshot(typo));
});

$.when.apply(null, arrFun).then(function(){
  var arrImg = [];

  arrData.forEach(function(data){
    var img = new Image;

    img.src = data;
//    img.onload = imgToCanvas;

    arrImg.push(img);

    window.open(data);
  });
});

/*
  var height = 0;

  arrImg.forEach(function(img){
    console.log("height: " + height);

    ctx.drawImage(img, 0, height);

    height += img.height;

    console.log("img.height: " + img.height);
  });

  window.open(canvas.toDataURL());
*/
