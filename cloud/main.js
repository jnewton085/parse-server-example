
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('hello2', function(req, res) {
	res.success('Hi2');
    });

Parse.Cloud.define('test_email', function(req, res) {
	//var SimpleMailgunAdapter = require('parse-server/lib/Adapters/Email/SimpleMailgunAdapter');
	/*var mg = new SimpleMailgunAdapter({
		apiKey: process.env.MAILGUN_KEY,
		domain: process.env.DOMAIN,
		fromAddress: process.env.MAILGUN_FROM_ADDRESS,
	    })};
    mg.send({
	    subject: "final Test passed",
		recipient: "jeremynewt@gmail.com",
		})*/
	res.sucess('Yes!');
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
