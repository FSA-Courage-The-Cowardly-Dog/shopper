const conn = require("./conn");
const Sequelize = require("sequelize");

const User = conn.define("user", {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: {
			arg: true,
			msg: "This e-mail has already been registered please try a different email address",
		},
		validate: { notEmpty: true },
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: {
			arg: true,
			msg: "This e-mail has already been registered please try a different email address",
		},
		validate: {
			notEmpty: false,
			isEmail: {
				args: true,
				msg: "this is not a valid email",
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
});

//authentication
User.prototype.addToCart = () => {};
User.prototype.removeFromCart = () => {};
User.prototype.createOrder = () => {};
User.prototype.cancelOrder = () => {};

module.exports = User;
