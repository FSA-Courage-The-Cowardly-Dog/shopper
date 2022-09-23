const Sequelize = require('sequelize');
const conn = require('./conn');
const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: true },
  },
  inventory: { type: Sequelize.INTEGER },
  img: { type: Sequelize.TEXT, defaultValue: '/default-product.jpg' },
  description: { type: Sequelize.TEXT },
});

module.exports = Product;
