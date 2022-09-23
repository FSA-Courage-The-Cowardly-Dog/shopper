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

// will also need to add in decrementing inventory later too;
// at that time, add in some front end validations for singleproduct views and cart/checkout view
// - shouldn't be able to add to cart if qty > product.inventory, and shouldn't be able to checkout in same condition

module.exports = Order;
