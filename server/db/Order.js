const conn = require("./conn");
import { Sequelize } from "sequelize";
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
