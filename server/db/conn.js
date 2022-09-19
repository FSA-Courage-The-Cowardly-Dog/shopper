const Sequelize = require('sequelize');

const config = {
  logging: false
};

if(process.env.QUIET){
  config.logging = false;
}

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/shopper', config);

module.exports = conn;
