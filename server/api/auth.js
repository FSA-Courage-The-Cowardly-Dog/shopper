const { User } = require('../db');
const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
router.post('/login', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send(token);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/orderhistory', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    const orders = await user.getOrderHistory();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/usercart', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    const cart = await user.getCart();
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/usercart', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    const cart = await user.getCart();
    await cart.update(req.body);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/usercart/checkout', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    const order = await user.createOrder();
    await order.update({ checkoutPrice: req.body.total });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.post('/usercart/create-checkout-session', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: JSON.parse(req.body.lineItems),

      success_url: `${process.env.CLIENT_URL}/stripe/processed`,
      cancel_url: `${process.env.CLIENT_URL}/cart/checkout`,
    });
    res.send({ url: session.url });
  } catch (err) {
    next(err);
  }
});

router.post('/usercart', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    await user.addToCart(req.body.productId, req.body.qty, req.body.size);
    const cart = await user.getCart();
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/usercart/:lineItemId', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    await user.updateQuantityInCart(
      req.params.lineItemId,
      Number(req.body.qty)
    );
    const userCart = await user.getCart();
    res.send(userCart);
  } catch (err) {
    next(err);
  }
});

router.delete('/usercart/:lineItemId', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    await user.removeFromCart(req.params.lineItemId);
    const userCart = await user.getCart();
    res.send(userCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
