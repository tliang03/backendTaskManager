var ES = require('../utils/esquery');

var doctype = 'tasks';

var _createTaskObj = function(uid, tid, task) {
	var obj = {};
	obj.userId = uid;
	obj.description = task.description || '';
	obj.content = task.content || '';
	obj.taskId = tid;
	return obj;
};

var _createResponse = function(hits) {
	var response = [];
	hits.forEach(function(hit){
		var obj = {};
		var source = hit['_source'];
		obj.userId = source['userId'];
		obj.description = source['description'];
		obj.content = source['content'];
		obj.taskId = source['taskId'];
		response.push(obj);
	});
	return response;
};

var _findNextIndex = function(uid){
	var queryBody = ES.createBody('userId: ' + uid, 0);
	queryBody.aggs = ES.createAgg('max', 'taskId');
	return ES.search(doctype, queryBody);
};

var _getTaskIds = function(lids){
	var idStr = ''
	if(lids.length >1) {
		lids.forEach(function(id, index){
			if(index !==0){
				idStr+= ' OR ';
			} else {
				idStr += '(';
			}
			idStr +='taskId:' + id;
		});
		idStr +=')';
	} else {
		idStr += 'taskId: '+ lids[0];
	}
	return idStr;
};

var addTask = function(uid, taskObj) {
	return _findNextIndex(uid).then(function(res){
		try{			
			var obj = ES.parseAggsResponse(res);
			var tid = obj.value !== null ? obj.value +1 : 0;			
			var fieldId = uid + '_' + tid;
			
			return ES.create(doctype, fieldId, _createTaskObj(uid, tid, taskObj)); 
		} catch(e) {
			return Promise.reject(e);
		}
	}, function(e){
		return Promise.reject(e);
	}).then(function(res){
		return Promise.resolve(tid);
	}, function(e){
		return Promise.reject(e);
	});
};

var deleteTask = function(uid, tid) {
	var queryStr = 'userId:'+ uid + ' AND ' + 'taskId:' + tid
	var body = ES.createBody(queryStr, 1000);
	return ES.delete(doctype, body);
};

var updateTask = function(uid, tid, taskObj) {
	return findTaskById(uid, tid).then(function(res){
		try{
			if(res && res['_id']){
				var id = res['_id'];
				return ES.update(doctype, id, taskObj);
			} else {
				return Promise.reject('User not exist in DB')
			}
		} catch(e) {
			return Promise.reject(e);
		}
	}, function(e){
		return Promise.reject(e);
	});
};

var findTaskById = function(uid, tid) {
	var queryStr = 'userId:'+ uid + ' AND ' +  _getTaskIds(tid);
	var body = ES.createBody(queryStr, 1);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};

var findAllTasks = function(uid) {
	var queryStr = 'userId:'+ uid ;
	var body = ES.createBody(queryStr, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};


var findTaskByKeyword = function(uid, keyword) {
	var queryStr = 'userId:'+ uid + ' AND ';
	queryStr += '(content:*'+ keyword + '* OR description:*' + keyword +'*)'
	var body = ES.createBody(queryStr, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};

module.exports = {
	addTask: addTask,	
	deleteTask: deleteTask,
	updateTask: updateTask,
	findAllTasks: findAllTasks,
	findTaskById: findTaskById,	
	findTaskByKeyword: findTaskByKeyword
}