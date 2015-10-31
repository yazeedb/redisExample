var express = require('express'),
	app = express()

var config = require('./config.js');

var bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect(config.db);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var authApi = require('./app/components/auth');
var usersApi = require('./app/components/users');

app.use('/api/auth', authApi(app, express));
app.use('/api/users', usersApi(app, express));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080);