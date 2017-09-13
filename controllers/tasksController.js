var taskModule = require('../modules/taskModule');
var mapperlModule = require('../modules/labelLabelMapperModule');
var errorHandler = require('../utils/errorhandler');

var addTask = function(req, res){
	var uid = req.query.uid;
	var taskObj = req.body || null;
	try{
		if(uid && taskObj) {
			taskModule.addTask(uid, taskObj).then(function(tid){
				if(taskObj.labels.length){
					return mapperlModule.addLabelsToTask(uid, tid, taskObj.labels);
				} else {
					return Promise.resolve();
				}
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- addTask');
			}).then(function(){
				res.status(200).send('Successfully add label.');
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- addLabel');
			});;
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- addTask');
	}
};

var deleteTask = function(req, res) {
	var uid = req.query.uid;
	var tid = req.params.tid;
	try{
		if(uid && tid) {
			var promiseArr = [
				taskModule.deleteTask(uid, tid),
				mapperlModule.deleteTask(uid, tid)
			];
			Promise.all(promiseArr).then(function(){
				res.status(200).send('Successfully remove task ' + tid + ' for user ' + uid);
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
	var uid = req.query.uid;
	var tid = req.params.tid;
	var taskObj = req.body || null;
	try{
		if(uid && tid) {
			taskModule.updateTask(uid, tid, taskObj).then(function(){
				res.status(200).send('Successfully updateTask task ' + tid + ' for user ' + uid);
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
