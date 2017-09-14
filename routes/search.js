const search = require('express').Router({mergeParams: true});
var searchCtl = require('../controllers/searchController');

var taskRouter = require('express').Router({mergeParams: true});
var labelsRouter = require('express').Router({mergeParams: true});

search.use('/task', taskRouter);

search.use('/label', labelsRouter);

//user search
search.route('/user/:uid')
	.get(searchCtl.findUserById);

//task search
taskRouter.route('/:uid')
	.get(searchCtl.findAllTasks);
taskRouter.route('/id/:uid/:tid')
	.get(searchCtl.findTaskById);
taskRouter.route('/keyword/:uid/:keyword')
	.get(searchCtl.findTaskByKeyword);
taskRouter.route('/label/:uid/:lid')
	.get(searchCtl.findTaskByLabelId);

//label search
labelsRouter.route('/:uid')
	.get(searchCtl.findAllLabels);
labelsRouter.route('/id/:uid/:lid')
	.get(searchCtl.findLabelById);
labelsRouter.route('/keyword/:uid/:keyword')
	.get(searchCtl.findLabelsByKeyword);
labelsRouter.route('/task/:uid/:tid')
	.get(searchCtl.findLabelsByTaskId);



module.exports = search;