const conn = require("./conn");
const Product = require("./Product");
const Tag = require("./Tag");
const User = require("./User");
const Order = require("./Order");
const LineItem = require("./LineItem");
const { users } = require('./seed/users.json');
const { products } = require('./seed/products.json');

User.hasMany(Order);
Order.belongsTo(User);

Tag.belongsToMany(Product, { through: "ProductTag" });
Product.belongsToMany(Tag, { through: "ProductTag" });

LineItem.belongsTo(Product);
Order.hasMany(LineItem);

const syncAndSeed = async () => {
	try {
	  await conn.sync({ force: true });
	  await Promise.all(products.map(campus => Product.create(campus)));
	  await Promise.all(users.map(student => User.create(student)));
  
	  //use this area to sync your database
	  console.log(`Seeding successful!`);
	} catch (err) {
	  console.error(err)
	}
  };

module.exports = {
	conn,
	User,
	Product,
	Order,
	Tag,
	LineItem,
	syncAndSeed
};
