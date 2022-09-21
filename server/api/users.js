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

router.put('/:id', async (req,res,next) => {
    try {
        const user = await User.findByPk(req.params.id)
        await user.update(req.body);
        res.send(user)
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req,res,next) => {
    try {
        if (req.headers.admin === 'true') {
            const users = await User.findAll();
            res.send(users)
        }
        // sending empty array for now if not admin; may want to later throw an error or unauthorized req response.
        else {
            res.send([])
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;