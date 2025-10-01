const router = require('express').Router();

router.get('/:id', (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const { id } = req.params;
    res.render('bot', { id });
})

module.exports = router;