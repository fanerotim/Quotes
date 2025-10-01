const router = require('express').Router();
const quoteService = require('../services/quoteService');

router.get('/:id', async (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const { id } = req.params;

    try {
        const result = await quoteService.getQuote(id);
        const quoteDetails = result[0];
        res.render('bot', { id, quoteDetails });
    } catch (err) {
        console.error(err.message);
        throw err;
    }

})

module.exports = router;