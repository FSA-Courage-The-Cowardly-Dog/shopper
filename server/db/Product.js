const conn = require("./conn");
import { Sequelize } from "sequelize";
const Product = conn.define("product", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: { notEmpty: true },
	},
	price: {
		type: Sequelize.DECIMAL(13, 2),
		allowNull: false,
		validate: { notEmpty: true },
	},
	inventory: { type: Sequelize.INTEGER },
	img: { type: Sequelize.TEXT, defaultValue: "/.png" },
	description: { type: Sequelize.TEXT },
});

module.exports = Product;
