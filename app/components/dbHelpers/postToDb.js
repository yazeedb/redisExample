var models = require('./allModels.js');

function postToDb (model, data) {
	var newPost = new models[model](data);

	//Return a save promise
	return newPost.save();
}

module.exports = postToDb;