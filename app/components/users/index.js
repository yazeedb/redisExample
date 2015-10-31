module.exports = userRoutes;

var dbInterface = require('../dbHelpers/dbInterface.js');
var passportJwt = require('../auth/jwtStrategy.js')();

function userRoutes (app, express) {
	var userApi = express.Router();

	userApi.post('/', function (req, res) {
			dbInterface.postToDb('User', req.body)
				.addBack(function (err) {
					if (err)
						return res.send(err);

					res.json({
						message: 'User added'
					});
				});
		});

	//middleware to authenicate JWTs	
	userApi.use(passportJwt, function (req, res, next) {
		next();
	});

	userApi.get('/me', function (req, res) {
		res.json(req.user);
	});

	userApi.get('/', function (req, res) {
			dbInterface.getFromDb('User')
				.exec(function (err, users) {
					if (err)
						return res.send(err);

					res.json(users);
				});
		});
		

	userApi.route('/:_id')
		.get(function (req, res) {
			dbInterface.getFromDb('User', { _id: req.params._id })
				.exec(function (err, users) {
					if (err)
						return res.send(err);

					res.json(users);
				});
		})
		.put(function (req, res) {
			dbInterface.getFromDb('User', { _id: req.params._id }, null, true)
				.exec(function (err, user) {
					if (err)
						return res.send(err);

					dbInterface.putToDb(req.body, user)
						.addBack(function (err) {
							if (err)
								return res.send(err);

							res.json({
								message: 'User successfully updated'
							})
						});
				});
		})
		.delete(function (req, res) {
			dbInterface.getFromDb('User', { _id: req.params._id }, null, true)
				.exec(function (err, user) {
					if (err)
						return res.send(err);

					dbInterface.deleteFromDb('User')
						.exec(function (err) {
							if (err)
								return res.send(err);

							res.json({
								message: 'User successfully deleted'
							});
						})
				});
		});

	return userApi;
}