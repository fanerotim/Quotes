const router = require('express').Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // TODO: I do not really want to return the token, as we are not logging the user automatically
        const token = await userService.register(email, password);
        res.status(200).json({ "auth": token, email });
    } catch (err) {
        res.status(500).json({ error: "User is already registered. Please try again." })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        res.status(200).json({ "auth": token, email })
    } catch (err) {
        // TODO: Fix error - it needs to be detected dynamically
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;