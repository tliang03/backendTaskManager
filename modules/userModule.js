var ES = require('../utils/esquery');

var doctype = 'users';

var _generateUserObj = function(obj){
	return {
		'userId': obj.uid,
		'firstName': obj.firstName || '',
		'lastName': obj.lastName || '',
		'email': obj.email,
		'password': obj.password
	}
};

var findById = function(id) {
	var body = ES.createBody('userId:' + id, 1000);
	return ES.search(doctype, body).then(function(res){
		var hits = res.hits.hits;
		return Promise.resolve(hits);
	}, function(e){
		return Promise.reject(e);
	});
};

var addUser = function(newUser) {
	return findById(newUser.uid).then(function(res){
		if(res.length){
			return Promise.reject('User already exists');
		} else {
			return ES.create(doctype,newUser.uid, _generateUserObj(newUser));
		}
	}, function(e){
		return Promise.reject(e);
	}).then(function(res){
		return Promise.resolve();
	}, function(e){
		return Promise.reject(e);
	});	
};

var updateUserById = function(id, userObj){
	return findById(id).then(function(res){
		if(res.length){
			return ES.update(doctype, id, userObj);
		} else {
			return Promise.reject('User not exist in DB')
		}
	}, function(e){
		return Promise.reject(e);
	}).then(function(res){
		return Promise.resolve();
	}, function(e){
		return Promise.reject(e);
	});
}

module.exports = {
	findUserById: findById,
	addUser: addUser,
	updateUserById: updateUserById
}