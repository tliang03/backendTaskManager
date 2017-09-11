var taskModule = require('../modules/taskModule');
var userModule = require('../modules/taskModule');
var errorHandler = require('../utils/errorhandler');

var findTask = function(req, res){
	var userId = req.query.userId;
	var taskId = req.query.taskId; //optional
	try{
		if(userId) {
			taskModule.findTask(userId, taskId).then(function(tasks){
				res.status(200).send(JSON.stringify(tasks));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findTask');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findTask');
	}
};

var findTaskByKeyword = function(req, res) {
	var keyword = req.params.keyword;
	var userId = req.query.userId;
	try{
		if(userId) {
			taskModule.findTaskByKeyword(userId, keyword).then(function(tasks){
				res.status(200).send(JSON.stringify(tasks));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskByKeyword');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskByKeyword');
	}
};


var getUserbyId = function(req, res){
	var userId = req.params.id;
	try{
		userModule.findById(userId).then(function(user){
			res.status(200).send(JSON.stringify(user));
		}, function(e){
			errorHandler.sendErrorMsg(res, 500,  e + '-- getUserbyId');
		});
	} catch(e){
		errorHandler.sendErrorMsg(res, 500, e + '-- getUserbyId');
	}	
};


module.exports = {
	findTask: findTask,
	findTaskByKeyword: findTaskByKeyword,
	findUserById: getUserbyId
}
