const conn = require('./conn');
const Sequelize = require('sequelize');
const Product = require('./Product');

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

LineItem.prototype.decrementInventory = async function() {
  const product = await Product.findByPk(this.productId);
  const newInventory = product.inventory - this.quantity;
  await product.update({inventory: newInventory})
}

module.exports = LineItem;
