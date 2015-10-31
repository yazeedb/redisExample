var configSettings = {
	db: 'mongodb://localhost/redisProject',
	port: process.env.PORT || 8080,
	secret: 'redis4life'
};

module.exports = configSettings;