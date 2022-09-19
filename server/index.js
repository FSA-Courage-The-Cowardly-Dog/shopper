const express = require("express");
const app = require("./app");
const conn = require("./db");
console.log("running nodemon?");
const port = process.env.PORT || 3000;
async function init() {
	app.listen(port, () =>
		console.log(`listening on http://localhost:${port}\n`)
	);
}

init();
