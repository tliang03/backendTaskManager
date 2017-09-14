const express = require('express');
var bodyParser = require('body-parser')
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
routes(app);

app.listen(8080, function(){
	console.log("Server start listening to 8080");
})


module.exports = app;