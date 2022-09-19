const conn = require("./conn");
const Product = require("./Product");
const Tag = require("./Tag");
const User = require("./User");
const Order = require("./Order");
const LineItem = require("./LineItem");

User.hasMany(Order);
Order.belongsTo(User);

Tag.hasMany(Product, { through: "ProductTag" });
Product.hasMany(Tag, { through: "ProductTag" });

LineItem.belongsTo(Product);
Order.hasMany(LineItem);

module.exports = {
	conn,
	User,
	Product,
	Order,
	Tag,
	LineItem,
};
