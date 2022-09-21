const router = require('express').Router();

const { Product } = require('../db');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');

// get All products
router.get('/', (req, res, next) => {
  return Product.findAll()
    .then((product) => {
      res.json(product);
      return null;
    })
    .catch(next);
});

// get product by price
router.get('/price/:price', (req, res, next) => {
  return Product.findAll({
    where: {
      price: {
        $lt: req.params.price,
      },
    },
  })
    .then((product) => res.json(product))
    .catch(next);
});

// get product by tag
router.get('/tag/:tag', (req, res, next) => {
  return Product.findAll({
    where: {
      tags: {
        $contains: [req.params.tag],
      },
    },
  })
    .then((product) => res.json(product))
    .catch(next);
});

//create new product
router.post('/add-product', requireToken, isAdmin, (req, res, next) => {
  console.log('papi', req.user.isAdmin);
  return Product.create(req.body)
    .then((product) => res.status(201).send(product))
    .catch(next);
});

// delete product
router.delete('/:id', requireToken, isAdmin, (req, res, next) => {
  return Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        return Product.destroy({ where: { id: req.params.id } }).then(() =>
          res.sendStatus(200)
        );
      } else res.sendStatus(404);
    })
    .catch(next);
});

// edit product
router.put('/:id', requireToken, isAdmin, (req, res, next) => {
  return Product.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then((result) => {
      result[1][0] ? res.json(result[1][0]) : res.sendStatus(404);
    })
    .catch(next);
});

module.exports = router;
