const router = require('express').Router();

const { Product, Tag } = require('../db');
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
router.get('/tag/:tag', async (req, res, next) => {
  try {
    const productList = await Tag.findOne({
      where: { name: req.params.tag },
      include: { model: Product },
    });
    res.send(productList);
  } catch (error) {
    next(error);
  }
});

// get list of all tags
router.get('/tags', async (req, res, next) => {
  try {
    const tagsList = await Tag.findAll();
    res.send(tagsList)
  } catch (error) {
    next(error)
  }
})

//create new product
router.post('/add-product', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body.productDetails)
    const tag = await Tag.findOne({where: {name: req.body.tag}})
    await product.addTag(tag);
    res.send(product)
  } catch (error){
    next(error)
  }
});

// get single product
router.get('/:id', (req, res, next) => {
  return Product.findByPk(req.params.id)
    .then((product) => res.json(product))
    .catch(next);
});

// delete product
router.delete('/:id', (req, res, next) => {
  return Product.findByPk(req.params.id)
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
router.put('/:id', (req, res, next) => {
  return Product.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  }).catch(next);
});

module.exports = router;
