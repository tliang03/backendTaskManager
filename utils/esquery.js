var elasticsearch = require('elasticsearch');

var index = 'taskmanager';

var client = new elasticsearch.Client({
	host: 'localhost:9200'
});

var searchData = function(type, searchObj){
	return client.search({
		index : index,
		type: type,
		body: searchObj
	});
};

var removeData = function(type, queryObj){
	return client.deleteByQuery({
		index : index,
		type: type,
		body : queryObj
	});
};

var createData = function(type, id, createObj){
	return client.create({
		index: index,
		type: type,
		id: id,
		body: createObj
	})
};

var updateData = function(type, id, updateObj) {
	return client.update({
		index: index,
		type: type,
		id: id,
		body: {
			doc: updateObj
		}
	});
};

var createBody = function(str, size){
	return {
		'query': {
			'query_string': {
				'query':str
			}
		},
		'size': size
	}
};

var createAgg = function(agg, field) {
	var obj = {
		"1":{}
	};
	obj['1'][agg] = {
		"field": field
	}
	return obj;
};

var parseAggsResponse = function(res) {
	return res.aggregations['1'];
}

module.exports = {
	createBody: createBody,
	createAgg: createAgg,
	parseAggsResponse: parseAggsResponse,
	search: searchData,
	delete: removeData,
	create: createData,
	update: updateData
}
