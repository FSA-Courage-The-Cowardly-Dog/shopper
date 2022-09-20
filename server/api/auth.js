const { User } = require('../db');
const router = require('express').Router();

router.post('/', async (req, res, next) => {
    try {
        // make User.authenticate method on model
        // res.send token returned from that method
    } catch(err) {
        next(err)
    }
});

router.get('/', async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
});

module.exports = router;