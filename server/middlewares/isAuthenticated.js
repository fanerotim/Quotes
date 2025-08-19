exports.isAuth = (req, res, next) => {
    const userData = req.user;
    
    if (!userData) {
        return res.status(401).json({err: 'Access Forbidden'})
    }
    next();
}