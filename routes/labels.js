const labels = require('express').Router();
var labelsCtl = require('../controllers/labelsController');

labels.route('/:uid/:lid')
	.delete(labelsCtl.deleteLabel);

labels.route('/create/:uid/')
	.post(labelsCtl.addLabel);

labels.route('/update/:uid/:tid')
	.post(labelsCtl.updateLabel);

module.exports = labels;