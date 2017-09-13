const tasks = require('express').Router();
var tasksCtl = require('../controllers/tasksController');

tasks.route('/:uid/:tid')
	.delete(tasksCtl.deleteTask);

tasks.route('/update/:uid/:tid')
	.post(tasksCtl.updateTask);

tasks.route('/create/:uid')
	.post(tasksCtl.addTask);


module.exports = tasks;