const labels = require('express').Router();
var labelsCtl = require('../controllers/labelsController');

labels.route('/:tid')
	.delete(labelsCtl.deleteTask);

labels.route('/add')
	.post(labelsCtl.addTask);

labels.route('/update')
	.post(labelsCtl.update);

module.exports = labels;