const router = require('express').Router();
const { Product, Tag } = require('../db');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
// const { Op } = require('sequelize');
// get All products
router.get('/', (req, res, next) => {
  return Product.findAll({ order: [['id', 'asc']], include: { model: Tag } })
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
router.get('/:tag/:page', async (req, res, next) => {
  console.log(req.params);
  try {
    const { count, rows } = await Product.findAndCountAll({
      include: {
        model: Tag,
        where: {
          name: [req.params.tag],
        },
      },
      offset: (req.params.page - 1) * 10,
      limit: 10,
    });
    console.log(count);
    res.send({ rows, count });
  } catch (error) {
    next(error);
  }
});

// get list of all tags
router.get('/tags', async (req, res, next) => {
  try {
    const tagsList = await Tag.findAll();
    res.send(tagsList);
  } catch (error) {
    next(error);
  }
});

//create new product
router.post('/add-product', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body.productDetails);
    const tag = await Tag.findOne({ where: { name: req.body.tag } });
    await product.addTag(tag);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// get single product
router.get('/:id', (req, res, next) => {
  return Product.findByPk(req.params.id, { include: { model: Tag } })
    .then((product) => res.json(product))
    .catch(next);
});

// delete product
router.delete('/:id', requireToken, isAdmin, (req, res, next) => {
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
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: { model: Tag },
    });
    if (req.body.action === 'remove-tag') {
      const tag = await Tag.findOne({ where: { name: req.body.tagName } });
      await product.removeTag(tag);
      const updated = await Product.findByPk(req.params.id, {
        include: { model: Tag },
      });
      res.send(updated);
    } else if (req.body.action === 'change-tag') {
      const oldTag = await Tag.findOne({ where: { name: req.body.prevName } });
      const newTag = await Tag.findOne({ where: { name: req.body.newName } });
      await product.removeTag(oldTag);
      await product.addTag(newTag);
      const updated = await Product.findByPk(req.params.id, {
        include: { model: Tag },
      });
      res.send(updated);
    } else if (req.body.action === 'update-product-details') {
      await product.update(req.body.productDetails);
      if (req.body.newTag.length) {
        const newTag = await Tag.findOne({ where: { name: req.body.newTag } });
        await product.addTag(newTag);
        const updated = await Product.findByPk(req.params.id, {
          include: { model: Tag },
        });
        res.send(updated);
      }
    } else {
      res.send(product);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
