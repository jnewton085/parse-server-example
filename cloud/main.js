
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('hello2', function(req, res) {
	res.success('Hi2');
    });

Parse.Cloud.define('resetPassword', function(req, res) {
	var query = new Parse.Query('_User');
	query.get(req.params.userId, {
		useMasterKey: true, 
		success: function(user) {
		    res.success('Found User ID!');
		},
		error: function(obj, error) {
		    res.error('Errored!');
		}
	    });
});