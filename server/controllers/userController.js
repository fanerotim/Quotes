const router = require('express').Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // TODO: Fix this
        // I do not really want to return the token for now, as currently we are not logging the user automatically
        // so now, I have the token, but am not doing anything with it;
        const token = await userService.register(email, password);
        res.status(200).json({message: 'User successfully registered'});
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const authData = await userService.login(email, password);
        res.status(200).json({ 
            auth: authData.token, 
            email: authData.email, 
            id: authData.id 
        })
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message })
    }
})

router.post('/logout', async (req, res) => {
    const accessToken = req.body.auth;

    try {
        req.user = null;
        const blacklistedToken = await userService.blacklistToken(accessToken);
        return res.status(200).json({ message: 'Successfully logged out' })
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message })
    }
})

module.exports = router;