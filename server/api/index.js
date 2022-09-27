const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/search', require('./search'));
router.use('/products', require('./products'));

module.exports = router;
