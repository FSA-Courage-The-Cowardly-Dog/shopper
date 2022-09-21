const User = require('../User');
const requireToken = async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('not an admin');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
