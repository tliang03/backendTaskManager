var Util = require('../utils/util');

var fileName = 'users.json';

var find = function(id) {
	return Util.readFile(fileName).then(function(allUsers){
		if(id in allUsers) {
			return allUsers[id];
		} else {
			throw 'No user match with the search Id. Please create a new one.'
		}

	}, function(e){
		throw e;
	});
};

var add = function(newUser) {
	var id = newUser.id;
	return Util.readFile(fileName).then(function(allUsers){
		if(id in allUsers) {
			throw 'User already exist'
		}
		allUsers[id] = newUser;
		return Util.updateToFile(fileName, allUsers);
	}, function(e){
		throw e;
	});
	
};

var update = function(id, userObj){
	return Util.readFile(fileName).then(function(allUsers){
		if(id && id in allUsers) {
			for(var key in userObj) {
				if(key !== 'id') {
					allUsers[id][key] = userObj[key];
				}
			}
			return Util.updateToFile(fileName, allUsers);
		} else {
			throw 'User not exist in DB'
		}		
		
	}, function(e){
		throw e;
	});
}

module.exports = {
	findById: find,
	addUser: add,
	updateUserById: update
}