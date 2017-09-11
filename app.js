const express = require('express');
var bodyParser = require('body-parser')
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
routes(app);

app.listen(5000, function(){
	console.log("Server start listening to 5000");
})


module.exports = app;