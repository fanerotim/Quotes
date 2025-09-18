exports.isGuest = (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({message: 'You are not authorized to access this resource. Please log in!'})
    }

    next();
}