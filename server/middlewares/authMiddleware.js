const jwt = require('../lib/jwt');
const { blacklistedTokens } = require('../utils/blacklistedTokens');

exports.auth = async (req, res, next) => {

    const accessToken = req.headers.accesstoken;

    if (!accessToken) {
        return next();
    }

    try {

        // demo logic that invalidates 
        if (blacklistedTokens.some((token) => token === accessToken)) {
            throw new Error('Invalid token - please login again.')
        }

        const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        req.user = null;
        res.status(401).json({ error: 'Authorization required for this request' });
    }
}