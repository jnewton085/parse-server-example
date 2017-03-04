
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('hello2', function(req, res) {
	res.success('Hi2');
    });

Parse.Cloud.define('resetPassword', function(req, res) {
	var query = new Parse.Query('_User');
	res.success(req.params.userId);
	//query.get(req.params.userId, {userMasterKey: true }).then((user) {
	//	user.setPassword(req.params.newPassword);
	//	return user.save(null, {useMasterKey: true});
	//}).then((user) => {
	//	    res.success('Reset password successfully')
	//	}, (obj, error) => {
	//	    res.error(error.message);
	//    });
    });