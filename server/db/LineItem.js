const conn = require("./conn");
import { Sequelize } from "sequelize";
const LineItem = conn.define("lineItem", {
	quantity: {
		type: Sequelize.Integer,
		allowNull: false,
		defaultValue: 1,
	},
});
//authentication

module.exports = LineItem;
