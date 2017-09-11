const tasks = require('express').Router();
var tasksCtl = require('../controllers/tasksController');

tasks.route('/:tid')
	.delete(tasksCtl.deleteTask);

tasks.route('/:tid')
	.post(tasksCtl.updateTask);

tasks.route('/add')
	.post(tasksCtl.addTask);


module.exports = tasks;