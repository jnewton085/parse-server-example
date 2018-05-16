Parse.Cloud.define("pushToUser", function(request, response) {
        var message = request.params.message;
        var recipient_id = request.params.recipient_user_id;
	
                   if (message != null && message !=="") {
                    message = message.trim();
                   } else {
                    response.error("Must provide \"message\" in JSON Data");
                    return;
                   }
        
                   var user_query = new Parse.Query(Parse.User);
                   user_query.equalTo("user", recipient_id);
                   var push_query = new Parse.Query(Parse.Installation);
                   push_query.matchesQuery("user", user_query);
                   response.error("Preparing to push" + message + " to " + recipient_id);
		   Parse.Push.send({
                                    where: push_query,
                                    data: {
                                        alert: message
                                    }
		       }, {useMasterKey: true}, {
                                   success: function() {
                                    // Push was successful
                                    console.log("Message was sent successfully")
                                   response.success('true');
                                   },
                                   error: function(error) {
                                    response.error(error);
                                   }
                 });
});

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('hello2', function(req, res) {
	res.success('Hi2');
    });

Parse.Cloud.define('reportImage', function(req, res) {
	var restaurant_id = req.params.restaurant_id;
	var image_information = req.params.image_info;
	var user_id = req.params.user_id;
	var mailgun = require('mailgun.js');
	var mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
	mg.messages.create(process.env.DOMAIN, {
		from: process.env.MAILGUN_REPORTING_FROM_ADDRESS,
		    to: [process.env.REPORTING_TO_ADDRESS],
		    subject: "Inappropriate Image Reported",
		    text: "Restaurant with id (" + restaurant_id + ") had an image (" + image_information + ") that was reported as inappropriate by User (" + user_id + ")"}).then(msg => console.log(msg)).catch(err => res.error(err));
	res.success("Image Flagged")
    });

Parse.Cloud.define('reportTip', function(req, res) {
        var restaurant_id = req.params.restaurant_id;
        var tip_string = req.params.tip_string;
        var user_id = req.params.user_id;
        var mailgun = require('mailgun.js');
        var mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
        mg.messages.create(process.env.DOMAIN, {
                from: process.env.MAILGUN_REPORTING_FROM_ADDRESS,
                    to: [process.env.REPORTING_TO_ADDRESS],
                    subject: "Inappropriate Tip Reported",
                    text: "Restaurant with id (" + restaurant_id + ") had a tip (" + tip_string + ") That was reported as inappropriate by User (" + user_id + ")"}).then(msg => console.log(msg)).catch(err => res.error(err));
        res.success("Tip Flagged")
	    });


Parse.Cloud.define('test_email', function(req, res) {
	var mailgun = require('mailgun.js');
	var mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
	mg.messages.create(process.env.DOMAIN, { 
		from: process.env.MAILGUN_FROM_ADDRESS,
		    to: ["jeremynewt@gmail.com"],
		    subject: "Hellow",
		    text: "orld",
		    html: "<h1> Just testing out ye olde mailgun </h1>"
		    }).then(msg => console.log(msg)).catch(err => res.error(err));
	res.success('Check Email!');
    });
Parse.Cloud.define("changeUserPassword", function(request, response) {
                   // Set up to modify user data
                   Parse.Cloud.useMasterKey();
                   var query = new Parse.Query(Parse.User);
                   query.equalTo("username", request.params.username);  // find all the women
                   query.first({
                               success: function(myUser) {
                               // Successfully retrieved the object.
                               myUser.set("password", request.params.newPassword);
                               
                               myUser.save(null, {
                                           success: function(myUser) {
                                           // The user was saved successfully.
                                           response.success("Successfully updated user.");
                                           },
                                           error: function(myUser, error) {
                                           // The save failed.
                                           // error is a Parse.Error with an error code and description.
                                           response.error("Could not save changes to user.");
                                           }
                                           });
                               
                               },
                               error: function(error) {
                               alert("Error: " + error.code + " " + error.message);
                               }
                               });
                   });
