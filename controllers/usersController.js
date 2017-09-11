var userModule = require('../modules/userModule')
var errorHandler = require('../utils/errorhandler');

var createUser = function(req, res){
	var userObj = req.body || {};
	try{
		if(userObj && userObj.id){
			var id = userObj.id;
			userModule.addUser(userObj).then(function(id){
				res.status(200).send(id);
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
	var userObj = req.body || {};
	var userId = req.params.id;
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