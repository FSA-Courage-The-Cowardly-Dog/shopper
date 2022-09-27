const conn = require('./conn');
const Product = require('./Product');
const Tag = require('./Tag');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
const { users } = require('./seed/users.json');
const { users2 } = require('./seed/users2.json');
const { products } = require('./seed/products.json');
const { tags } = require('./seed/tags.json');
User.hasMany(Order);
Order.belongsTo(User);

Tag.belongsToMany(Product, { through: 'ProductTag' });
Product.belongsToMany(Tag, { through: 'ProductTag' });

LineItem.belongsTo(Product);
Order.hasMany(LineItem);

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });
    await User.create({
      username: 'test',
      email: 'test@apple.com',
      password: 'password',
      firstName: 'test first name',
      lastName: 'test last name',
      isAdmin: false,
    });
    await User.create({
      username: 'admin',
      email: 'admin@apple.com',
      password: 'password',
      firstName: 'admin first name',
      lastName: 'admin last name',
      isAdmin: true,
    });
    await Promise.all(tags.map((tags) => Tag.create(tags)));
    await Promise.all(users.map((user) => User.create(user)));
    await Promise.all(users2.map((user) => User.create(user)));
    await Promise.all(
      products.map(async (product) => {
        const newprod = await Product.create(product);
        if (product.tags) {
          product.tags.forEach(async (tag) => {
            let newtag = await Tag.findOne({ where: { name: tag.name } });
            await newprod.addTag(newtag);
          });
        }
      })
    );
    // await Promise.all(
    //   products.map(async (product) => {
    //     const newprod = await Product.create(product);
    //     if (product.tags) {
    //       product.tags.forEach(async (tag) => {
    //         let newtag = await Tag.findOne({ where: { name: tag.name } });
    //         await newprod.addTag(newtag);
    //       });
    //     }
    //   })
    // );
    // console.log(`Seeding successful!`);
  } catch (err) {
    console.error(err);
  }
};
const syncAndSeedmini = async () => {
  try {
    await conn.sync({ force: true });
    await User.create({
      username: 'test',
      email: 'test@apple.com',
      password: 'password',
      firstName: 'test first name',
      lastName: 'test last name',
      isAdmin: false,
    });
    await User.create({
      username: 'admin',
      email: 'admin@apple.com',
      password: 'password',
      firstName: 'admin first name',
      lastName: 'admin last name',
      isAdmin: true,
    });
    await Promise.all(tags.map((tags) => Tag.create(tags)));
    await Promise.all(users.map((user) => User.create(user)));
    await Promise.all(
      products.map(async (product) => {
        const newprod = await Product.create(product);
        if (product.tags) {
          product.tags.forEach(async (tag) => {
            let newtag = await Tag.findOne({ where: { name: tag.name } });
            await newprod.addTag(newtag);
          });
        }
      })
    );
    console.log(`Seeding successful!`);
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  conn,
  User,
  Product,
  Order,
  Tag,
  LineItem,
  syncAndSeed,
  syncAndSeedmini,
};
