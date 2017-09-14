var userModule = require('../modules/userModule')
var errorHandler = require('../utils/errorhandler');

var createUser = function(req, res){
	var userObj = req.body || {};
	try{
		if(userObj && userObj.uid){
			var id = userObj.uid;
			userModule.addUser(userObj).then(function(){
				res.status(200).send('Successfully create user.');
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- createUser');
			});
		} else {
			throw 'user name is required';
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- createUser');
	}
};

var updateUser = function(req, res){
	var userObj = req.body || null;
	var userId = userObj? userObj.uid : null;
	try{
		if(userId){
			userModule.updateUserById(userId, userObj).then(function(){
				res.status(200).send('User successfully updated.');
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- updateUser');
			});
		} else {
			throw 'User id is required.'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- updateUser');
	}
};


module.exports = {
	createUser: createUser,
	updateUser: updateUser
}