var taskModule = require('../modules/taskModule')
var errorHandler = require('../utils/errorhandler');

var addTask = function(req, res){
	var userId = req.query.userId;
	var taskObj = req.body || null;
	try{
		if(userId && taskObj) {
			taskModule.addTask(userId, taskObj).then(function(tid){
				res.status(200).send(tid);
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- addTask');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- addTask');
	}
};

var deleteTask = function(req, res) {
	var userId = req.query.userId;
	var taskId = req.params.taskId;
	try{
		if(userId && taskId) {
			taskModule.deleteTask(userId, taskId).then(function(){
				res.status(200).send('Successfully remove task ' + taskId + ' for user ' + userId);
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- deleteTask');
			});
		} else {
			throw 'userId and taskId are required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- deleteTask');
	}
};

var updateTask = function(req, res) {
	var userId = req.query.userId;
	var taskId = req.params.taskId;
	var taskObj = req.body || null;
	try{
		if(userId && taskId) {
			taskModule.updateTask(userId, taskId, taskObj).then(function(){
				res.status(200).send('Successfully updateTask task ' + taskId + ' for user ' + userId);
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- updateTask');
			});
		} else {
			throw 'userId and taskId are required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- updateTask');
	}
};

module.exports = {
	addTask: addTask,
	deleteTask: deleteTask,
	updateTask: updateTask
}
