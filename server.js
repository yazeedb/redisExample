var express = require('express'),
	app = express()

var config = require('./config.js');

var bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect(config.db);

app.set('view engine', 'jade');
app.set('views', (__dirname + '/public/views'));
app.locals.pretty = true;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var authApi = require('./app/components/auth');
var usersApi = require('./app/components/users');

app.use('/api/auth', authApi(app, express));
app.use('/api/users', usersApi(app, express));

app.get('/', function (req, res) {
	res.render('index.jade');
});

app.get('/protected', function (req, res) {
	res.render('protected.jade');
});

app.listen(8080);