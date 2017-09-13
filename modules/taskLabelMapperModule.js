var ES = require('../utils/esquery');

var doctype = 'tasklabelsmapper';

var _createLabelIdsResponse = function(hits) {
	var response = [];
	hits.forEach(function(hit){
		response.push(source['labelId']);
	});
	return response;
};

var _createTaskIdsResponse = function(hits) {
	var response = [];
	hits.forEach(function(hit){
		response.push(source['taskId']);
	});
	return response;
};

var _craeteMapperObj = function(uid, tid, lid){
	return {
		"userId": uid,
		"taskId": tid,
		"labelId": lid
	}
};

var _getIdStr = function(field, ids){
	var idStr = ''
	if(ids.length >1) {
		ids.forEach(function(id, index){
			if(index !==0){
				idStr+= ' OR ';
			} else {
				idStr += '(';
			}
			idStr += field + ':' + id;
		});
		idStr +=')';
	} else {
		idStr += field + ':' + ids[0];
	}
	return idStr;
};

//task controller / label controller
var addLabelsToTask = function(uid, tid, lids){
	try{
		var promiseArr = [];
		lids.forEach(function(lid){
			var id = uid + '_' + tid + '_' + lid;
			var mapperObj = _craeteMapperObj(uid, tid, lid);
			promiseArr.push(ES.create(doctype, id, mapperObj));
		});
		return Promise.all(promiseArr);	
	} catch(e){
		return Promise.reject(e);
	}	
};

//label controller
var deleteLabelsFromTask = function(uid, tid, lids){
	var queryStr = 'userId:'+ uid + 
		' AND ' + 'taskId:' + tid +  
		' AND ' + _getIdStr('labelId', lids);

	var body = ES.createBody(queryStr, 10000);
	return ES.delete(doctype, body);
};

//label controller
var deleteLabel = function(uid, lid){
	var queryStr = 'userId:'+ uid + ' AND ' + 'labelId:' + lid;

	var body = ES.createBody(queryStr, 10000);
	return ES.delete(doctype, body);
};

//task controoler
var deleteTask = function(uid, tid){
	var queryStr = 'userId:'+ uid + ' AND ' + 'taskId:' + tid;

	var body = ES.createBody(queryStr, 10000);
	return ES.delete(doctype, body);
};

//search controller
var findLabelsByTaskId = function(uid, tid){
	var queryStr = 'userId:'+ uid + ' AND ' + 'taskId: ' + tid;
	var body = ES.createBody(queryStr, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createLabelIdsResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};

//search controller
var findTasksByLabelId = function(uid, lid) {
	var queryStr = 'userId:'+ uid + ' AND ' +  'labelId:' + lid;
	var body = ES.createBody(queryStr, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createLabelIdsResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};

module.exports = {
	addLabelsToTask: addLabelsToTask,
	deleteLabelsFromTask: deleteLabelsFromTask,
	deleteLabel: deleteLabel,
	deleteTask: deleteTask,
	findLabelsByTaskId: findLabelsByTaskId,
	findTasksByLabelId: findTasksByLabelId
}