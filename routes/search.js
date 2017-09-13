const search = require('express').Router({mergeParams: true});
var searchCtl = require('../controllers/searchController');

var taskRouter = require('express').Router({mergeParams: true});
var labelsRouter = require('express').Router({mergeParams: true});

search.use('/task', taskRouter);

search.use('/label', labelsRouter);

//user search
search.route('/user')
	.get(searchCtl.findUserById);

//task search
taskRouter.route('/')
	.get(searchCtl.findAllTasks);
taskRouter.route('/id/:tid')
	.get(searchCtl.findTaskById);
taskRouter.route('/keyword/:keyword')
	.get(searchCtl.findTaskByKeyword);
labelsRouter.route('/label/:lid')
	.get(searchCtl.findTaskByLabelId);

//label search
labelsRouter.route('/')
	.get(searchCtl.findAllLabels);
labelsRouter.route('/id/:lid')
	.get(searchCtl.findLabelById);
labelsRouter.route('/keyword/:keyword')
	.get(searchCtl.findLabelsByKeyword);
labelsRouter.route('/task/:tid')
	.get(searchCtl.findLabelsByTaskId);



module.exports = search;