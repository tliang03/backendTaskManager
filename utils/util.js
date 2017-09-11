var fs = require('fs');
var path = require('path');

var isEmptyObj = function(obj) {
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			return false;
		}
	}
	return true;
};

var readFile = function(fileName){
	var jsonPath = path.join(__dirname, '..', 'data', fileName);
	return new Promise(function(resolve, reject){
		fs.readFile(jsonPath, "utf8", function(error, tasks){
			if(error){
				reject(error);
			}
			resolve(JSON.parse(tasks));
		});
	});
};

var updateToFile = function(fileName, obj){
	var jsonPath = path.join(__dirname, '..', 'data', fileName);
	return new Promise(function(resolve, reject){
		fs.writeFile(jsonPath, JSON.stringify(obj), function(error, data){
			if(error) {
				reject(error);
			}
			resolve();
		});
	});
};

module.exports = {
	isEmptyObj: isEmptyObj,
	readFile: readFile,
	updateToFile: updateToFile
}