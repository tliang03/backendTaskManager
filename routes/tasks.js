const tasks = require('express').Router();
var tasksCtl = require('../controllers/tasksController');

tasks.route('/:tid')
	.delete(tasksCtl.deleteTask);

tasks.route('/update/:tid')
	.post(tasksCtl.updateTask);

tasks.route('/create')
	.post(tasksCtl.addTask);


module.exports = tasks;