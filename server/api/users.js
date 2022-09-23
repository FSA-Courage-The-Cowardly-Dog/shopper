const router = require('express').Router();
const { User, Order } = require('../db');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');

router.post('/', async (req, res, next) => {
  try {
    req.body.isAdmin = false;
    const user = await User.create(req.body);
    res.send(user);
    // may want to also create a new Order for user here
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/cart', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(Number(req.params.id))
    // making sure user has a cart initialized before adding to it
    await user.getCart();
    req.body.forEach(async element => {
      await user.addToCart(Number(element[0]), Number(element[1]));
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
