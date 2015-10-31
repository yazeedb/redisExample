var models = require('./allModels.js');

function deleteFromDb (model, selector) {
	//Return a query to delete a single user
	return models[model].findOneAndRemove(selector);
}

module.exports = deleteFromDb;