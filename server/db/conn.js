const Sequelize = require('sequelize');
const dbName = 'shopper';

const config = {};

if (process.env.DATABASE_URL) {
	// process.env.CLIENT_URL = 'https://courage-grace-shopper.herokuapp.com';
	config.dialectOptions = { ssl: { require: true, rejectUnauthorized: false } };
} else {
	process.env.CLIENT_URL = 'http://localhost:3000';
}

if (process.env.QUIET) {
	config.logging = false;
}
const conn = new Sequelize(
	process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
	config
);

module.exports = conn;
