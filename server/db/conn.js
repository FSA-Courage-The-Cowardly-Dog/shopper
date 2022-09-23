const Sequelize = require('sequelize');
const dbName = 'shopper';

const config = {};

if (process.env.DATABASE_URL) {
  config.dialectOptions = { ssl: { require: true, rejectUnauthorized: false } };
}

if (process.env.QUIET) {
  config.logging = false;
}
const conn = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  config
);

module.exports = conn;
