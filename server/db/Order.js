const conn = require("./conn");
const Sequelize = require("sequelize");

const Order = conn.define("order", {
	status: {
		type: Sequelize.ENUM("ACTIVE", "PROCESSED", "CANCELED", "COMPLETED"),
		allowNull: false,
		defaultValue: "ACTIVE",
	},
	address: { type: Sequelize.TEXT },
});
//authentication

module.exports = Order;
