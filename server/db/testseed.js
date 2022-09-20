const conn = require('./conn');
const User = require('./User');

const seedUsers = async () => {
    await conn.sync();
    const credentials = [
        {username: 'luke', email: 'luke@luke.com', password: 'luke_pw', firstName: 'Luke', lastName: 'Multanen', isAdmin: true},
        {username: 'lisa', email: 'lisa@lisa.com', password: 'lisa_pw', firstName: 'Lisa', lastName: 'Zhu'}
    ]
    const [luke, lisa] = await Promise.all(
        credentials.map( credential => User.create(credential))
    )
}

module.exports = seedUsers;