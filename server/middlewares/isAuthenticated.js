// this middleware checks if user is logged in and if not returns a forbidden error
exports.isAuth = (req, res, next) => {
    const userData = req.user;
    
    if (!userData) {
        return res.status(403).json({error: 'Access Forbidden'})
    }
    next();
}