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

ctx.font = "30pt 新細明體";

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
      arrData.push({
        "response": response,
        "typo": typo
      });

      d.resolve();
    });
  });

  return d;
}

arrTypo.forEach(function(typo){
  //prevent other pages access current page
  if(typo.url === window.location.href){
    arrFun.push(screenshot(typo));
  }
});

$.when.apply(null, arrFun).then(function(){
  var arrImg = [];

  arrData.forEach(function(data){
    var img = document.createElement("img");

    img.src = data.response;

    data.img = img;

    arrImg.push(img);

    delete data.response;
  });

  imagesLoaded(arrImg, function(instance){
    var height = 0;

    canvas.height = $(window).height() * arrImg.length;
    canvas.width = $(window).width();

    instance.images.forEach(function(image, i){
      var typo = arrData[i].typo;

      ctx.fillText(typo.oldText, 0, height + 30);
      ctx.drawImage(image.img, 0, height + 30 + 30);

      height += (image.img.height + 30);
    });

    window.open(canvas.toDataURL());

    window.open("mailto:" + recipients + "?subject=" + subject + "&body=" + body);
  });
});
