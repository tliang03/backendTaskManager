const labels = require('express').Router();
var labelsCtl = require('../controllers/labelsController');

labels.route('/:lid')
	.delete(labelsCtl.deleteLabel);

labels.route('/create')
	.post(labelsCtl.addLabel);

labels.route('/update/:tid')
	.post(labelsCtl.updateLabel);

module.exports = labels;