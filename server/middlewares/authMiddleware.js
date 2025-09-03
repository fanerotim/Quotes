const jwt = require('../lib/jwt');
const userService = require('../services/userService');

exports.auth = async (req, res, next) => {

    const accessToken = req.headers.accesstoken;

    if (!accessToken) {
        return next();
    }

    try {
        // first check to make sure token is not blacklisted;
        const isBlacklisted = await userService.isTokenBlacklisted(accessToken);

        if (isBlacklisted) {
            const error = new Error('Authorization required for this request!');
            error.statusCode = 401;
            throw error;
        }

        const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decodedToken;

        next();
    } catch (err) {
        req.user = null;
        return res.status(401).json({ error: err.message });
    }
}