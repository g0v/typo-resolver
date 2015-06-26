Parse.initialize("UlAH22fSJ4ZHX8PPL4PfzEemzmdpUYDZRDsbgxTH", "9uCom1u4NBFUKynD276AIrkDL2mXhAqa7zuBmbt5");


var regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;
var emails = $("body").html().match(regex);
var nl = "%0D%0A";
var recipients = "";
var TEXT_HEIGHT = 60;
var IMG_HEIGHT = 70;
var MARGIN_HEIGHT = 60;

if(emails !== null) {
  recipients = emails;
}else{
  email = "email not found";
}

var subject = "[Typo Resolver] " + document.title + " has some typo";
var body = "Hello" + nl + nl + "Your site has some typo. The attachment has already highlight it." + nl + nl + nl + "from Typo Resolver ( https://chrome.google.com/webstore/detail/kpmhpplainkjokabdbjkfdkohacblnlo ) ";
var arrData = [];
var arrFun = [];

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

  html2canvas(document.body, {
    onrendered: function(canvas) {

      var tempIMG = new Image();
      tempIMG.src = canvas.toDataURL();

      imagesLoaded(arrImg, function(instance){
        var height = canvas.height;

        canvas.height = (TEXT_HEIGHT + IMG_HEIGHT + MARGIN_HEIGHT) * arrImg.length+canvas.height;
        canvas.width = $(window).width();

        var ctx = canvas.getContext("2d");

        ctx.font = "40px Arial";
        ctx.drawImage(tempIMG,0,0);

        instance.images.forEach(function(image, i){
          var typo = arrData[i].typo;

          console.log(image.img.width + ", " + image.img.height);

          ctx.fillText(typo.oldText + " => "  + typo.newText, 0, height + (TEXT_HEIGHT - 20));

          height += TEXT_HEIGHT;

        });
      });

      $.ajax({
        url: 'https://api.imgur.com/3/image',
        headers: {
          'Authorization': 'Client-ID 33f1b82cfcb816a'
        },
        type: 'POST',
        data: {
          'image': canvas.toDataURL("image/png").replace("data:image/png;base64,","")
        },
        datatype: 'JSON',
        success: function(req)
        {
          window.open(req.data.link);

          var Feedback_report = Parse.Object.extend("Feedback_report");
          var feedback_report = new Feedback_report();
          feedback_report.set("owner_email",String(emails));
          feedback_report.set("owner_url",String(window.location.href));
          feedback_report.set("image_url",String(req.data.link));

          feedback_report.save(null, {
            success: function(feedback_report) {
              // Execute any logic that should take place after the object is saved.
              alert('we received your feedback, thank for your report!!');
            },
            error: function(feedback_report, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and description.
              alert('Failed to create new object, with error code: ' + error.description);
            }
          });


        },
        error: function(xhr ,ajaxOption, thrownError)
        {
          alert('ERROR SECTION : Handle Comments');
        }
      });

    }
  });

});
