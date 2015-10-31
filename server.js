var express = require('express'),
	app = express();

var redis = require('redis'),
	client = redis.createClient();

var config = require('./config.js');

var bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect(config.db);

app.set('view engine', 'jade');
app.set('views', (__dirname + '/public/views'));
app.locals.pretty = true;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	client.get('token', function (err, reply) {
		if (err)
			console.log(err);
		if (reply) {
			res.redirect('/protected');
		} else {
			res.render('index.jade');
		}
	})
});

app.get('/protected', function (req, res) {
	client.get('token', function (err, reply) {
		if (err)
			console.log(err);

		if (reply) {
			res.render('protected.jade', { token: reply });
		} else {
			res.redirect('/403');
		}
	});
});

app.get('/403', function (req, res) {
	res.render('403.jade');
});

app.get('/signout', function (req, res) {
	client.del('token', function (err) {
		if (err)
			console.log(err);
		res.redirect('/');
	});
});

var authApi = require('./app/components/auth');
var usersApi = require('./app/components/users');

app.use('/api/auth', authApi(app, express));
app.use('/api/users', usersApi(app, express));

app.listen(8080);