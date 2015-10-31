var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	firstName: { type: String },
	lastName: { type: String },
	events: { type: Array }
});

UserSchema.pre('save', function (next) {
	var user = this;

	//Password hashing
	if (!user.isModified('password'))
		return next();

	bcrypt.hash(user.password, null, null, function (err, hash) {
		if (err)
			return next(err);

		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function (passwordToCompare) {
	var user = this;

	if (typeof passwordToCompare != 'string')
		return false;

	return bcrypt.compareSync(passwordToCompare, user.password);
};

module.exports = mongoose.model('User', UserSchema);