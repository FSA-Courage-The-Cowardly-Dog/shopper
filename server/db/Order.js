const conn = require('./conn');
const Sequelize = require('sequelize');

const Order = conn.define('order', {
  status: {
    type: Sequelize.ENUM('ACTIVE', 'PROCESSED', 'CANCELED', 'COMPLETED'),
    allowNull: false,
    defaultValue: 'ACTIVE',
  },
  address: { type: Sequelize.TEXT },
  checkoutPrice: { type: Sequelize.INTEGER, defaultValue: 0 }
});
//authentication
// will modify checkout handler method to include total price, save it to order when processed

// will also need to add in decrementing inventory later too

module.exports = Order;
