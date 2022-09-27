const router = require('express').Router();
const { Product, Tag } = require('../db');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
// const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    console.log('>>>>>>>>>');
    console.log(req.params);
    console.log(req.query);
    //http://localhost:5000/api/search?julie=27
    //{ '123': '123' }{ '123': '123' }
    const { count, rows } = await Product.findAndCountAll({
      include: {
        model: Tag,
      },
      offset: (req.params.page - 1) * 10,
      limit: 10,
    });
    console.log('search', count);
  } catch (error) {}
});

module.exports = router;
