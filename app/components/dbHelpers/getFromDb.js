var models = require('./allModels.js');

function getFromDb (model, query, whatToSelect, justOne) {
	if (justOne)
		return models[model].findOne(query).select(whatToSelect);
	else
		return models[model].find(query).select(whatToSelect);
}

module.exports = getFromDb;