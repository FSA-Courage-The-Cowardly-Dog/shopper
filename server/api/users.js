const router = require("express").Router();
const { User, Order } = require("../db");

router.post("/", async (req, res, next) => {
	try {
		req.body.isAdmin = false;
		const user = await User.create(req.body);
		res.send(user);
		// may want to also create a new Order for user here
	} catch (err) {
		next(err);
	}
});

module.exports = router;
