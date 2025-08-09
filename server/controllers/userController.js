const router = require('express').Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.register(email, password);
        res.status(200).send({ "auth": token });
    } catch (err) {
        res.status(500).send({ errror: "User is already registered. Please try again." })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        res.status(200).send({ "auth": token })
    } catch (err) {
        // TODO: Fix error - it needs to be detected dynamically
        res.status(500).send({ error: "User does not exist!" })
    }
})

module.exports = router;