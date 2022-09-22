const conn = require('./conn');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('./Order')
const LineItem = require('./LineItem');
const jwtStr = process.env.JWT;
const saltRounds = Number(process.env.SALT);

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      arg: true,
      msg: 'This username has already been registered please try a different username',
    },
    validate: { notEmpty: true },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      arg: true,
      msg: 'This e-mail has already been registered please try a different email address',
    },
    validate: {
      notEmpty: false,
      isEmail: {
        args: true,
        msg: 'this is not a valid email',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  address: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
});

//authentication
User.byToken = async (token) => {
  try {
    jwt.verify(token, jwtStr);
    const user = await User.findByPk(jwt.decode(token).userId, {
      // may want to include Order model; could be useful for displaying order history
    });
    if (user) {
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};
User.decodeToken =  async (token) => {
  try {
    jwt.verify(token, jwtStr);
    return jwt.decode(token).userId
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}
User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});
User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    var temp = jwt.sign({ userId: user.id }, jwtStr);
    return temp;
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};

User.prototype.getCart = async function () {
  const [cart, created] = await Order.findOrCreate({
    where: {
      userId: this.id,
      status: 'ACTIVE'
    }, include: {
      model: LineItem,
    }, order: [
      [{model: LineItem},'id','asc']
    ]
  });
  return cart;
};

User.prototype.addToCart = async function (productId, qty) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find(lineItem => lineItem.productId === productId)
  if (lineItem) {
    await lineItem.update({quantity: (lineItem.quantity+qty)})
  } else {
    await LineItem.create({quantity: qty, productId, orderId: cart.id})
  }
};

User.prototype.removeFromCart = async function (lineItemId) {
  const lineItem = await LineItem.findByPk(lineItemId);
  const cart = await this.getCart();
  await cart.removeLineItem(lineItem);
  await lineItem.destroy();
};

User.prototype.updateQuantityInCart = async function(lineItemId, qty) {
  const lineItem = await LineItem.findByPk(lineItemId);
  await lineItem.update({quantity: qty})
}

// default using user address; when checking out on site, can give option to use different address, which can be inputted as param
User.prototype.createOrder = async function (address = this.address) {
  const order = await this.getCart();
  await order.update({status: 'PROCESSED'});
  await Order.create({userId: this.id})

  //returning processed cart by default; can think about if we even need a return function or not later
  return order;

  //may later need to iterate through cart and decrement LineItem qty from respective Product
  //also will need to validate that enough Product in stock for each LineItem; could be a front-end validator check as well
};

// will write this later; unsure if meant to clear cart, or cancel PROCESSED order
User.prototype.cancelOrder = async function () {};

module.exports = User;
