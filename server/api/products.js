const router = require('express').Router();
const Sequelize = require('sequelize');
const { Product, Tag } = require('../db');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
// const { Op } = require('sequelize');
const env = require('../../.env.json');
const algoliasearch = require('algoliasearch');
const ALGOLIA_WRITE_KEY =
  process.env.ALGOLIA_WRITE_KEY || env.ALGOLIA_WRITE_KEY;
const requestOptions = {
  timeouts: { connect: 2, read: 20 },
};
const client = algoliasearch('0STO802E4O', ALGOLIA_WRITE_KEY, requestOptions);
const index = client.initIndex('test_index');

// get All products
router.get('/', async (req, res, next) => {
  try {
    const includeObj = { model: Tag };
    if (req.query.page) {
      if (req.query.tag) {
        includeObj.where = { name: [req.query.tag] };
      }
      const orderArr =
        req.query.sort === 'true'
          ? [Sequelize.fn('lower', Sequelize.col('product.name')), 'asc']
          : ['id', 'asc'];
      const products = await Product.findAll({
        order: [orderArr],
        include: includeObj,
        offset: (req.query.page - 1) * 25,
        limit: 25,
      });
      res.send(products);
    } else {
      if (req.headers.tagfilter.length) {
        includeObj.where = { name: [req.headers.tagfilter] };
      }
      const products = await Product.findAll({
        order: [['id', 'asc']],
        include: includeObj,
      });
      res.send(products);
    }
  } catch (err) {
    next(err);
  }
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
  let itemsPerPage = req.query.items || 24;
  let price = req.query.price;
  try {
    const { count, rows } = await Product.findAndCountAll({
      include: {
        model: Tag,
        where: {
          name: [req.params.tag],
        },
      },
      offset: (req.params.page - 1) * itemsPerPage,
      limit: itemsPerPage,
      order: price ? [['price', price]] : [],
    });
    // console.log(count);
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
    console.log('post', product);
    const tag = await Tag.findOne({ where: { name: req.body.tag } });
    await product.addTag(tag);
    const updated = await Product.findByPk(product.id, {
      include: { model: Tag },
    });
    if (updated) {
      console.log('put', product.dataValues.id);
      console.log('putend', updated.dataValues.id);

      await index
        .saveObject({
          ...updated.dataValues,
          objectID: updated.dataValues.id,
        })
        .then(({ objectID }) => {
          console.log('new objectID', objectID);
        });
    }
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

// get single product
router.get('/:id', (req, res, next) => {
  return Product.findByPk(req.params.id, { include: { model: Tag } })
    .then((product) => res.json(product))
    .catch((error) => next(error));
});

// delete product
router.delete('/:id', requireToken, isAdmin, (req, res, next) => {
  return Product.findByPk(req.params.id)
    .then((product) => {
      if (product) {
        return Product.destroy({ where: { id: req.params.id } })
          .then(async () => await index.deleteObject(req.params.id))
          .then(() => res.sendStatus(200));
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
      }
      const updated = await Product.findByPk(req.params.id, {
        include: { model: Tag },
      });
      if (updated) {
        console.log('put', product.dataValues.id);
        console.log('putend', updated.dataValues.id);

        await index
          .saveObject({
            ...updated.dataValues,
            objectID: updated.dataValues.id,
          })
          .then(({ objectID }) => {
            console.log('updated objectID', objectID);
          });
      }

      res.send(updated);
    } else {
      res.send(product);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
