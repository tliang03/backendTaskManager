const tasks = require('express').Router();
var tasksCtl = require('../controllers/tasksController');

tasks.route('/:uid/:tid')
	.delete(tasksCtl.deleteTask);

tasks.route('/update')
	.post(tasksCtl.updateTask);

tasks.route('/create')
	.post(tasksCtl.addTask);

tasks.route('/labels')
	.post(tasksCtl.addLabelsToTask);

tasks.route('/:uid/:tid/:lids')
	.delete(tasksCtl.deleteLabelsFromTask);


module.exports = tasks;