const search = require('express').Router();
var searchCtl = require('../controllers/searchController');


search.route('/task')
	.get(searchCtl.findTask);

search.route('/user')
	.get(searchCtl.findUserById);

search.route('/task/findbykeyword/:keyword')
	.get(searchCtl.findTaskByKeyword);


module.exports = search;