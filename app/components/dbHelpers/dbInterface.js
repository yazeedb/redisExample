//A single file where all DB controllers are brought together
//This is to avoid too many require() in the API file

var postToDb = require('./postToDb.js'),
	getFromDb = require('./getFromDb.js'),
	putToDb = require('./putToDb.js'),
	deleteFromDb = require('./deleteFromDb.js');

module.exports = {
	postToDb: postToDb,
	getFromDb: getFromDb,
	putToDb: putToDb,
	deleteFromDb: deleteFromDb
}