// this middleware checks if user is logged in and if it is throws an error
// protects routes such /login and /regiter as if user is already logged in, they cannot log in again
exports.isLoggedIn = (req, res, next) => {
    const user = req.user;
    
    if (user) {
        return res.status(403).json({message: 'You are already logged in. Resource Forbidden!'})
    }
    next();
}