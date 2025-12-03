const router = require('express').Router();
const quoteService = require('../services/quoteService');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    console.log('i was called to render dynamic head', req.headers)
    try {
        const result = await quoteService.getQuote(id);
        const quoteDetails = result[0];
        res.render('bot', { quoteDetails, layout: false });
    } catch (err) {
        console.error(err.message);
        throw err;
    }
})

module.exports = router;