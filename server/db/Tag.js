const Sequelize = require("sequelize");

const conn = require("./conn");

const Tag = conn.define("tag", {
	name: { type: Sequelize.STRING },
});
module.exports = Tag;
