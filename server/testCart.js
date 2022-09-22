// file for testing cart methods; will delete later, do not want to merge
const db = require('./db');


const testFunction = async () => {
    await db.conn.sync();
    console.log('db synced');
    const user = await db.User.findByPk(1)
    const cart = await user.getCart();
    console.log('logging cart', cart)
    await user.addToCart(1,10)
    // console.log('logging cart after adding', cart)
    // await user.addToCart(2,1)
    // await user.addToCart(3,1)
    // have to change below input param each time since deleting lineItem
    // await user.removeFromCart(3)
    // await user.updateQuantityInCart(1,1)
    // await user.createOrder();
}

testFunction();