const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users')

router.use('/auth', authRouter)
router.use('/users', userRouter)

module.exports = router;