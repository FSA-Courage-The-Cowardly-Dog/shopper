const conn = require('./conn');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
    type: Sequelize.STRING,
    defaultValue: '',
  },
});

//authentication
User.byToken = async (token) => {
  try {
    jwt.verify(token, jwtStr);
    const user = await User.findByPk(jwt.decode(token).userId, {
      // include: {
      //     model: Order
      // }
      // may want to add in Order model later; would be useful for displaying old orders, getting current cart, etc.
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

User.prototype.addToCart = () => {};
User.prototype.removeFromCart = () => {};
User.prototype.createOrder = () => {};
User.prototype.cancelOrder = () => {};

// will probably want a method to get current cart?

module.exports = User;
