const app = require('./app');
const db = require('./db');
const port = process.env.PORT || 5000;
require('dotenv').config();
async function init() {
  try {
    await db.conn.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.listen(port, () =>
    console.log(`listening on http://localhost:${port}/\n`)
  );
}

init();
