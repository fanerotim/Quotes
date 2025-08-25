const jwt = require('../lib/jwt');
const userService = require('../services/userService');

exports.auth = async (req, res, next) => {

    const accessToken = req.headers.accesstoken;

    if (!accessToken) {
        return next();
    }

    // TODO: TROUBLESHOOT WHY IMPORTING USER SERVICE RETURNS THIS ERROR:
    // {"error":"Cannot enqueue Query after fatal error."}
    // I NEED TO CHECK IF TOKEN IS BLACKLISTED IN THE AUTH MIDDLEWARE

    try {
        const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        req.user = null;
        res.status(401).json({ error: 'Authorization required for this request' });
    }
}