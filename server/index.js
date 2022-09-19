const port = process.env.PORT || 3000;
const app = require('./app');
const db = require('./db');

const init = async () => {
    await db.syncAndSeed();
    console.log('LOGGING PORT')
    app.listen(port, ()=>console.log(`listening on port ${port}`));
}

init();