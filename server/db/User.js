const conn = require('./conn');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Product = require('./Product');
const jwtStr = process.env.JWT || 'courage';
const saltRounds = Number(process.env.SALT || 10);

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
User.decodeToken = async (token) => {
  try {
    jwt.verify(token, jwtStr);
    return jwt.decode(token).userId;
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};
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

User.prototype.getOrderHistory = async function () {
  const orders = await Order.findAll({
    where: {
      userId: this.id,
      status: {
        [Sequelize.Op.ne]: 'ACTIVE'
      } 
    }, 
    order: [
      ['id', 'desc']
    ],
    include: {
      model: LineItem,
      include: {
        model: Product
      }
    }, 
  })
  return orders;
}

User.prototype.getCart = async function () {
  const [cart, created] = await Order.findOrCreate({
    where: {
      userId: this.id,
      status: 'ACTIVE',
    },
    include: {
      model: LineItem,
      include: {
        model: Product,
      },
    },
    order: [[{ model: LineItem }, 'id', 'asc']],
  });
  if (!cart.address) {
    await cart.update({ address: this.address });
  }
  // check to see if any products have been deleted from db
  if (cart.lineItems) {
    for (const lineItem of cart.lineItems) {
      if (!lineItem.productId) {
        await lineItem.destroy();
      }
    }
  }
  return cart;
};

User.prototype.addToCart = async function (productId, qty, size) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find(lineItem => (lineItem.productId === productId)&&(lineItem.size === size))
  if (lineItem) {
    await lineItem.update({ quantity: lineItem.quantity + qty });
  } else {
    await LineItem.create({quantity: qty, productId, size, orderId: cart.id})
  }
};

User.prototype.removeFromCart = async function (lineItemId) {
  const lineItem = await LineItem.findByPk(lineItemId);
  const cart = await this.getCart();
  await cart.removeLineItem(lineItem);
  await lineItem.destroy();
};

User.prototype.updateQuantityInCart = async function (lineItemId, qty) {
  const lineItem = await LineItem.findByPk(lineItemId);
  await lineItem.update({ quantity: qty });
};

User.prototype.createOrder = async function () {
  const order = await this.getCart();
  for (const lineItem of order.lineItems) {
    await lineItem.decrementInventory();
  }
  await order.update({ status: 'COMPLETED' });
  await this.getCart();
  return order;
};
// making all checked-out orders completed for now; if time, will later change to processed, and give user time to cancel before admin changes status to completed

// will write this later; unsure if meant to clear cart, or cancel PROCESSED order
User.prototype.cancelOrder = async function () {};

module.exports = User;
