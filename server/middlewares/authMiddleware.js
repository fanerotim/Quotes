const jwt = require('../lib/jwt');

exports.auth = async (req, res, next) => {

    const accessToken = req.headers.accesstoken;

    if (!accessToken) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.log(err);
    }
}