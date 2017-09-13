var labelModule = require('../modules/labelModule');
var mapperlModule = require('../modules/taskLabelMapperModule');
var errorHandler = require('../utils/errorhandler');

var addLabel = function(req, res){
	var uid = req.params.uid;
	var labelObj = req.body || null;
	try{
		if(uid && labelObj) {
			labelModule.addLabel(uid, labelObj).then(function(tid){				
				res.status(200).send('Successfully add label.');
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- addLabel');
			});
		} else {
			throw 'userId is required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- addLabel');
	}
};

var deleteLabel = function(req, res) {
	var uid = req.params.uid;
	var lid = req.params.lid;
	try{
		if(uid && lid) {
			var promiseArr = [
				labelModule.deleteLabel(uid, lid),
				mapperlModule.deleteLabel(uid, lid)
			];
			Promise.all(promiseArr).then(function(){
				res.status(200).send('Successfully remove label ' + lid + ' for user ' + uid);
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- deleteLabel');
			});
		} else {
			throw 'userId and labelId are required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- deleteLabel');
	}
};

var updateLabel = function(req, res) {
	var uid = req.params.uid;
	var tid = req.params.tid;
	var labelObj = req.body || null;
	try{
		if(uid && tid) {
			labelModule.updateLabel(uid, tid, labelObj).then(function(){
				res.status(200).send('Successfully updateLabel label ' + tid + ' for user ' + uid);
			}, function(e) {
				errorHandler.sendErrorMsg(res, 500,  e + '-- updateLabel');
			});
		} else {
			throw 'userId and labelId are required'
		}
		
	} catch(e){
		errorHandler.sendErrorMsg(res, 500,  e + '-- updateLabel');
	}
};
 
module.exports = {
	addLabel: addLabel,
	deleteLabel: deleteLabel,
	updateLabel: updateLabel
}
