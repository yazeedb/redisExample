function putToDb (newInfo, item) {
	//Update the item with the information entered
	var key;

	for (key in newInfo) {
		item[key] = newInfo[key];
	}

	//Return a save promise
	return item.save();
}

module.exports = putToDb;