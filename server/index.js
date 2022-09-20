const app = require("./app");
const db = require("./db");
console.log("running nodemon?");
const port = process.env.PORT || 5000;
async function init() {
	await db.conn.sync({ force: true });
	console.log(`Seeding? successful!`);

	app.listen(port, () =>
		console.log(`listening on http://localhost:${port}\n`)
	);
}

init();
