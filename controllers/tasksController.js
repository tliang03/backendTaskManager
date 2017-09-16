var taskModule = require('../modules/taskModule');
var mapperlModule = require('../modules/taskLabelMapperModule');
var errorHandler = require('../utils/errorhandler');

var addTask = function(req, res){
	var taskObj = req.body || null;
	var uid = taskObj ? taskObj.uid : null;	
	var lids = taskObj && taskObj.lids ? taskObj.lids.split(','): []
	try{
		if(uid && taskObj) {
			taskModule.addTask(uid, taskObj).then(function(tid){
				if(lids && lids.length){
					return mapperlModule.addLabelsToTask(uid, tid, lids);
				} else {
					return Promise.resolve();
				}
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- addTask');
			}).then(function(){
				res.status(200).send('Successfully add task.');
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- addTask');
			});;
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- addTask');
	}
};

var deleteTask = function(req, res) {
	var uid = req.params.uid;
	var tid = req.params.tid;
	try{
		if(uid && (tid !== null)) {
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
	var taskObj = req.body || null;
	var uid = taskObj ? taskObj.uid : null;
	var tid = taskObj ? taskObj.tid : null;
	try{
		if(uid && (tid !== null)) {
			taskModule.updateTask(uid, tid, taskObj).then(function(){
				res.status(200).send('Successfully update task ' + tid + ' for user ' + uid);
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

var addLabelsToTask = function(req, res) {
	var taskObj = req.body || null;
	var uid = taskObj ? taskObj.uid : null;
	var tid = taskObj ? taskObj.tid : null;
	var lids = (taskObj && taskObj.lids)? taskObj.lids.split(','): [];
	try{
		if(uid && (tid !== null) && lids.length) {
			mapperlModule.addLabelsToTask(uid, tid, lids).then(function(){
				res.status(200).send('Successfully add labels to task ' + tid + ' for user ' + uid);
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- addLabelsToTask');
			});
		} else {
			throw 'userId, taskId and lids are required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- addLabelsToTask');
	}
};

var deleteLabelsFromTask = function(req, res) {
	var uid = req.params.uid;
	var tid = req.params.tid;
	var lids = req.params.lids? req.params.lids.split(','): [];
	try{
		if(uid && (tid !== null) && lids.length) {
			mapperlModule.deleteLabelsFromTask(uid, tid, lids).then(function(){
				res.status(200).send('Successfully remove labels from task ' + tid + ' for user ' + uid);
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- deleteLabelsFromTask');
			});
		} else {
			throw 'userId, taskId and lids are required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- deleteLabelsFromTask');
	}
};

module.exports = {
	addTask: addTask,
	addLabelsToTask: addLabelsToTask,
	deleteTask: deleteTask,
	deleteLabelsFromTask: deleteLabelsFromTask,
	updateTask: updateTask
}
