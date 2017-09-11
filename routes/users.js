const users = require('express').Router();
var usersCtl = require('../controllers/usersController');

users.route('/create')
	.post(usersCtl.createUser);

users.route('/update/:id')
	.post(usersCtl.updateUser);


module.exports = users;