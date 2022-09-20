const app = require("./app");
const db = require("./db");
const seedUsers = require("./db/testseed");
console.log("running nodemon?");
const port = process.env.PORT || 5000;
async function init() {
	await db.conn.sync({ force: true });
	await seedUsers();
	console.log(`Seeding? successful!`);

	app.listen(port, () =>
		console.log(`listening on http://localhost:${port}\n`)
	);
}

init();

//adding in test user seed file; can delete when merging