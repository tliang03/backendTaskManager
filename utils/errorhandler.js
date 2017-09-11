var sendErrorMsg = function(res, status, msg){
	res.status(status).send(msg);
}

module.exports = {
	sendErrorMsg: sendErrorMsg
}