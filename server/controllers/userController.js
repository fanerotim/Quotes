const router = require('express').Router();
const userService = require('../services/userService');
const { isLoggedIn } = require('../route-guards/isLoggedIn');
const { isGuest } = require('../route-guards/isGuest');

router.post('/register', isLoggedIn, async (req, res) => {
    const { email, password } = req.body;

    try {
        // TODO: Fix this
        // I do not really want to return the token for now, as currently we are not logging the user automatically
        // so now, I have the token, but am not doing anything with it;
        const token = await userService.register(email, password);
        return res.status(200).json({ message: 'User successfully registered' });
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message })
    }
})

router.post('/login', isLoggedIn, async (req, res) => {
    const { email, password } = req.body;

    try {
        const authData = await userService.login(email, password);

        return res.status(200).json({
            auth: authData.token,
            email: authData.email,
            id: authData.id
        })
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message })
    }
})

router.post('/logout', isGuest, async (req, res) => {
    
    try {
        req.user = null;
        const blacklistedToken = await userService.blacklistToken(accessToken);
        return res.status(200).json({ message: 'Successfully logged out' })
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message })
    }
})

router.post('/reset-password', isLoggedIn, async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'You need to provide an email address in order to reset your password' });
    }

    try {
        await userService.resetUserPassword(email);
        return res.status(200).json({ message: 'Password updated successfully. Please check your email.' })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({ message: err.message })
    }
})

module.exports = router;