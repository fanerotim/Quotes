export const isGuest = (req, res, next) => {
    const user = req.user;

    if (!user) {
        res.status(401).json({mesasge: 'You are not authorized to access this resource. Please log in!'})
    }

    next ();
}