var users = require('./users');
var tasks = require('./tasks');
var labels = require('./labels');
var search = require('./search');


module.exports = function(app){
	app.get('/', function(req, res) {
		res.send('task manager / hit');
	});

	app.use('/users', users);
	app.use('/tasks', tasks);
	app.use('/labels', labels);
	app.use('/search', search);
}