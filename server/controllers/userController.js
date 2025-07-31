const router = require('express').Router();
const userService = require('../services/userService')

router.post('/register', async (req, res) => {
    const { email, password, rePassword } = req.body;

    try {
        const registeredUser = await userService.register(email, password);
    } catch (err) {
        console.log(err);
        res.status(500).send({ ...err })
    }
})

module.exports = router;