var users = require('./users');
var tasks = require('./tasks');
var search = require('./search');
var labels = require('./labels');



module.exports = function(app){
	app.get('/', function(req, res) {
		res.send('task manager / hit');
	});

	app.use('/users', users);
	app.use('/tasks', tasks);
	app.use('/search', search);
	// app.use('/labels', labels);
	
}