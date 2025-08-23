const router = require('express').Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // TODO: I do not really want to return the token, as we are not logging the user automatically
        const token = await userService.register(email, password);
        res.status(200).json('User successfully registered');
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        res.status(200).json({ "auth": token, email })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/logout', async (req, res) => {
    // APART FROM nullifying the req.user I also need to invalidate the token - not yet implemented
    req.user = null;
    return res.status(200).json({ message: 'Successfully logged out' })
})

module.exports = router;