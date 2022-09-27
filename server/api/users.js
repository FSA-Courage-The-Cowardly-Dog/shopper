const router = require('express').Router();
const { User, Order } = require('../db');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
const Sequelize = require('sequelize')

router.post('/', async (req, res, next) => {
  try {
    req.body.isAdmin = false;
    const user = await User.create(req.body);
    res.send(user);
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
    if (req.query.page) {
      const orderArr = req.query.sort === 'true' ? [Sequelize.fn('lower',Sequelize.col('lastName')), 'asc'] : ['id','asc']
      const users = await User.findAll({
        order: [orderArr],
        offset: (req.query.page-1)*25,
        limit: 25
      })
      res.send(users)
    } else {
      const users = await User.findAll();
      res.send(users);
    }
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
      element[1].forEach(async item => 
        await user.addToCart(Number(element[0]), Number(item.qty), item.size)
      )
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
