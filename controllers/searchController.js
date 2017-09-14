var taskModule = require('../modules/taskModule');
var userModule = require('../modules/userModule');
var labelModule = require('../modules/labelModule');
var mapperlModule = require('../modules/taskLabelMapperModule');
var errorHandler = require('../utils/errorhandler');

/****************************************
	Section: Functions to find tasks
****************************************/
var findAllTasks = function(req, res){
	var uid = req.params.uid;
	try{
		if(uid) {
			taskModule.findAllTasks(uid).then(function(tasks){
				res.status(200).send(JSON.stringify(tasks));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findAllTasks');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findAllTasks');
	}
};

var findTaskById = function(req, res){
	var uid = req.params.uid;
	var tid = req.params.tid;
	try{
		if(uid && tid) {
			taskModule.findTaskById(uid, tid).then(function(tasks){
				res.status(200).send(JSON.stringify(tasks));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskById');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskById');
	}
};

var findTaskByKeyword = function(req, res) {
	var uid = req.params.uid;
	var keyword = req.params.keyword;
	try{
		if(uid && keyword) {
			taskModule.findTaskByKeyword(uid, keyword).then(function(tasks){
				res.status(200).send(JSON.stringify(tasks));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskByKeyword');
			});
		} else {
			throw 'userId and keyword is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskByKeyword');
	}
};

var findTaskByLabelId = function(req, res) {
	var uid = req.params.uid;
	var lid = req.params.lid;
	try{
		if(uid && lid) {
			mapperlModule.findTasksByLabelId(uid, lid).then(function(tids){
				if(tids.length){
					return taskModule.findTaskById(uid, tids);
				} else {
					return [];
				}				
			}, function(e) {
				
			}).then(function(labels){
				res.status(200).send(JSON.stringify(labels));
			}, function(e){
				errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskByLabelId');
			});
		} else {
			throw 'userId and label id are required'
		}
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findTaskByLabelId');
	}
};

/****************************************
	Section: Functions to find users
****************************************/
var findUserById = function(req, res){
	var uid = req.params.uid;
	try{
		userModule.findUserById(uid).then(function(user){
			res.status(200).send(JSON.stringify(user));
		}, function(e){
			errorHandler.sendErrorMsg(res, 500,  e + '-- getUserbyId');
		});
	} catch(e){
		errorHandler.sendErrorMsg(res, 500, e + '-- getUserbyId');
	}	
};

/****************************************
	Section: Functions to find labels
****************************************/
var findAllLabels = function(req, res){
	var uid = req.params.uid;
	try{
		if(uid) {
			labelModule.findAllLabels(uid).then(function(labels){
				res.status(200).send(JSON.stringify(labels));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findAllLabels');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findAllLabels');
	}
};

var findLabelById = function(req, res){
	var uid = req.params.uid;
	var lid = req.params.lid ? req.params.lid.split(','): null;
	try{
		if(uid && lid) {
			labelModule.findLabelById(uid, lid).then(function(labels){
				res.status(200).send(JSON.stringify(labels));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findLabelById');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findLabelById');
	}
};

var findLabelsByKeyword = function(req, res) {	
	var uid = req.params.uid;
	var keyword = req.params.keyword;
	try{
		if(uid && keyword) {
			labelModule.findLabelsByKeyword(uid, keyword).then(function(labels){
				res.status(200).send(JSON.stringify(labels));
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- findLabelsByKeyword');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findLabelsByKeyword');
	}
};

var findLabelsByTaskId = function(req, res) {	
	var uid = req.params.uid;
	var tid = req.params.tid;
	try{
		if(uid && tid) {
			mapperlModule.findLabelsByTaskId(uid, tid).then(function(lids){
				if(lids.length){
					return labelModule.findLabelById(uid, lids);
				} else {
					return [];
				}				
			}, function(e) {
				
			}).then(function(labels){
				res.status(200).send(JSON.stringify(labels));
			}, function(e){
				errorHandler.sendErrorMsg(res, 500,  e + '-- findLabelsByTaskId');
			});
		} else {
			throw 'userId and taskis required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- findLabelsByTaskId');
	}
};


module.exports = {
	findTaskById: findTaskById,
	findUserById: findUserById,
	findLabelById: findLabelById,

	findAllTasks: findAllTasks,
	findAllLabels: findAllLabels,

	findTaskByKeyword: findTaskByKeyword,	
	findLabelsByKeyword: findLabelsByKeyword,

	findTaskByLabelId: findTaskByLabelId,
	findLabelsByTaskId: findLabelsByTaskId
}
