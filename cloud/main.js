
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('hello2', function(req, res) {
	res.success('Hi2');
    });

Parse.Cloud.define('test_email', function(req, res) {
	/*var mailgun = require('mailgun.js');
	var mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
	mg.messages.create(process.env.DOMAIN, { 
		from: process.env.MAILGUN_FROM_ADDRESS,
		    to: ["jeremynewt@gmail.com"],
		    subject: "Hellow",
		    text: "orld",
		    html: "<h1> Just testing out ye olde mailgun </h1>"
		    }).then(msg => console.log(msg)).catch(err => res.error(err));*/
	res.success('Yes!');
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
