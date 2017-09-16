var ES = require('../utils/esquery');

var doctype = 'labels';

var _createLabelObj = function(uid, lid, label) {
	var obj = {};
	obj.userId = uid;
	obj.content = label.content || '';
	obj.labelId = lid;
	return obj;
};

var _getUpdateObj = function(labelObj){
	var obj = {};
	if(labelObj.content) {
		obj.content = labelObj.content;
	}
	return obj;
};

var _createResponse = function(hits) {
	var response = [];
	hits.forEach(function(hit){
		var obj = {};
		var source = hit['_source'];
		obj.userId = source['userId'];
		obj.content = source['content'];
		obj.labelId = source['labelId'];
		response.push(obj);
	});
	return response;
};

var _getLabelIds = function(lids){
	var idStr = '';
	if(lids.length >1) {
		lids.forEach(function(id, index){
			if(index !==0){
				idStr+= ' OR ';
			} else {
				idStr += '(';
			}
			idStr +='labelId:' + id;
		});
		idStr +=')';
	} else {
		idStr += 'labelId: '+ lids[0];
	}
	return idStr;
};

var _findLastIndex = function(uid){
	var queryBody = ES.createBody('userId: ' + uid, 0);
	queryBody.aggs = ES.createAgg('max', 'labelId');
	return ES.search(doctype, queryBody);
};

var addLabel = function(uid, labelObj) {
	var lid = null;
	return _findLastIndex(uid).then(function(res){
		try{			
			var obj = ES.parseAggsResponse(res);
			lid = obj.value !== null ? obj.value +1 : 0;			
			var fieldId = uid + '_' + lid;
			
			return ES.create(doctype, fieldId, _createLabelObj(uid, lid, labelObj)); 
		} catch(e) {
			return Promise.reject(e);
		}
	}, function(e){
		return Promise.reject(e);
	});
};

var deleteLabel = function(uid, lid) {
	var queryStr = 'userId:'+ uid + ' AND ' + 'labelId:' + lid;
	var body = ES.createBody(queryStr, 1000);
	return ES.delete(doctype, body);
};

var updateLabel = function(uid, lid, labelObj) {
	return findLabelById(uid, [lid]).then(function(res){
		try{
			if(res && res.length){
				var id = uid + '_' + lid;
				return ES.update(doctype, id, _getUpdateObj(labelObj));
			} else {
				return Promise.reject('User not exist in DB');
			}
		} catch(e) {
			return Promise.reject(e);
		}
	}, function(e){
		return Promise.reject(e);
	});
};

var findLabelById = function(uid, lid) {
	var queryStr = 'userId:'+ uid + ' AND ' + _getLabelIds(lid);
	var body = ES.createBody(queryStr, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};

var findAllLabels = function(uid) {
	var queryStr = 'userId:'+ uid;
	var body = ES.createBody(queryStr, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};

var findLabelsByKeyword = function(uid, keyword) {
	var queryStr = 'userId:'+ uid + ' AND ';
	queryStr += 'content:*'+ keyword + '*'
	var body = ES.createBody(queryStr, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(_createResponse(hits));
	}, function(e){
		return Promise.reject(e);
	});
};

module.exports = {
	addLabel: addLabel,	
	deleteLabel: deleteLabel,
	updateLabel: updateLabel,
	findLastLabelIndex: _findLastIndex,
	findAllLabels: findAllLabels,
	findLabelById: findLabelById,
	findLabelsByKeyword: findLabelsByKeyword
}