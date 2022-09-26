const conn = require('./conn');
const Sequelize = require('sequelize');

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  size: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
});
//authentication

module.exports = LineItem;
