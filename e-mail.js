Parse.initialize("D2PfOAkIKIPqPEffK6TFcwuv8s2Suj5nUSDzTjin", "uD7MDAGFJ2OwyQiz84gYSy2zffEdafrlzhuSP2pN");

var Feedback_report = Parse.Object.extend("Feedback_report");
var feedback_report = new Feedback_report();
var objectId = feedback_report.id
var query = new Parse.Query(Feedback_report);
<script type="text/javascript" async="" src="https://ssl.google-analytics.com/ga.js"></script>


query.get(objectId,{
  success: function(feedback_report){
    var email = require('mailer');
    email.send({
        host: 'smtp.sendgrid.net',
        port : '2525',
        domain: 'smtp.sendgrid.net',
        authentication: 'login',
        username: 'typoresolver',
        password: 'typoresolver_nccu0',
        to : feedback_report.get("owner_email"),
        from : 'typoresolvernccu@gmail.com',
        subject : 'This a feed back from your website !',
        body : 'Report come from this website '+ feedback_report.get("owner_url") + 'This image would show you what to modify' + feedback_report.get("image_url"),
      },
      // Callback function in case of error.
      function(err, result){
        if(err){ console.log(err); }
      });
  },
  error: function(feedback_report ,error){
    alert('Failed to get the e-mail of the owner, with error code: ' + error.description);
  }
})
