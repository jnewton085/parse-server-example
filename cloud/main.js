
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('resetPassword', function(req, res) {
	var query = new Parse.query("_User");
	query.get(request.params.userId, {userMasterKey: true }).then((user) {
		user.setPassword(request.params.newPassword);
		return user.save(null, {useMaterKey: true});
	    }).then((user) => {
		    response.success(JSON.stringify(user))
		}, (obj, error) => {
		    response.error(error.message);
		});
    });