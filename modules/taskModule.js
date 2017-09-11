var Util = require('../utils/util');

var fileName = 'tasks.json';


var _getAllTasks = function(allTasks, userId, taskId) {
	var response = [];
	if (userId in allTasks) {
		if(taskId) {
			var userTasks = allTasks[userId];
			for(var i =0; i< userTasks.length; i++){
				if(userTasks[i].id === taskId) {
					response.push(userTasks[i]);
				}
			}
		} else {
			response = allTasks[userId];
		}
	}
	return response;
};

var _getTasksByKeywords = function(allTasks, userId, keywrod) {
	var response = [];
	keywrod = keywrod.toLowerCase();
	if (userId in allTasks) {
		var userTasks = allTasks[userId];
		for(var i =0; i< userTasks.length; i++){
			var description = userTasks[i].description.toLowerCase();
			var content = userTasks[i].content.toLowerCase();

			if(description.indexOf(keywrod)>=0){
				response.push(userTasks[i]);
			} else if(content.indexOf(keywrod)>=0) {
				response.push(userTasks[i]);
			}
		}
	}
	return response;
};

var _findNextTaskId = function(allTasks, userId){
	var maxIndex = -1;
	if (userId in allTasks) {
		var userTasks = allTasks[userId];
		for(var i=0; i<userTasks.length; i++) {
			var tid = parseInt(userTasks[i].id);
			maxIndex = Math.max(maxIndex, tid);
		}
		return maxIndex+1;
	} else {
		return null;
	}
};

var _createTaskObj = function(uid, tid, task) {
	var obj = {};
	obj.createdBy = uid;
	obj.description = task.description || '';
	obj.content = task.content || '';
	if(tid){
		obj['id'] = tid.toString();
	} else {
		obj['id'] = '0';
	}
	return obj;
};

var findTask = function(userId, taskId) {
	return Util.readFile(fileName).then(function(allTasks){
		try{
			return _getAllTasks(allTasks, userId, taskId);
		} catch(e) {
			throw e;
		}
	}, function(e){
		throw e;
	});
};

var findByKeyword = function(userId, keywrod) {
	return Util.readFile(fileName).then(function(allTasks){
		try{
			return _getTasksByKeywords(allTasks, userId, keywrod);
		} catch(e) {
			throw e;
		}	
	}, function(e){	
		throw e;
	});
};

var addTask = function(userId, taskObj) {
	return Util.readFile(fileName).then(function(allTasks){
		try{			
			var id = _findNextTaskId(allTasks, userId);
			var tObj = _createTaskObj(userId, id, taskObj);
			if(userId in allTasks) {
				allTasks[userId].push(tObj);
			} else {
				allTasks[userId] = [tObj];
			}   
			return Util.updateToFile(fileName, allTasks);
		} catch(e) {
			throw e;
		}
	}, function(e){
		throw e;
	});
};

var deleteTask = function(userId, taskId) {
	return Util.readFile(fileName).then(function(allTasks){
			if(userId in allTasks) {
				var rmIndex = -1;
				allTasks[userId].some(function(taskObj, index){
					if(taskObj.id === taskId) {
						rmIndex = index;
						return true;
					}
				});
				if(rmIndex !== -1){
					allTasks[userId].splice(rmIndex, 1);
					return Util.updateToFile(fileName, allTasks);
				} else {
					return Promise.resolve();
				}
				
			} else {
				return Promise.resolve();
			}
			
	}, function(e){
		throw e;
	});
};

var updateTask = function(userId, taskId, task) {
	if(Util.isEmptyObj(task)){
		return Promise.resolve();
	}
	return Util.readFile(fileName).then(function(allTasks){
		if(uid in allTasks) {
			var id = -1;
			allTasks[uid].some(function(taskObj, index){
				if(taskObj.id === taskId){
					id = index;
					taskObj.description = task.description || taskObj.description;
					taskObj.content = task.content || taskObj.content;
					return true;
				}
			});
			if(id !== -1) {
				return Util.updateToFile(fileName, allTasks);
			} else {
				return Promise.resolve();
			}
			
		}
	}, function(e){

	});
};

module.exports = {
	addTask: addTask,
	findTask: findTask,
	findTaskByKeyword: findByKeyword,
	deleteTask: deleteTask,
	updateTask: updateTask
}