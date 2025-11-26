const router = require('express').Router();
const quoteService = require('../services/quoteService');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    console.log('these are req.params', req.params)
    try {
        const result = await quoteService.getQuote(id);
        console.log('this is result', result)
        const quoteDetails = result[0];
        res.render('bot', { quoteDetails });
    } catch (err) {
        console.error(err.message);
        throw err;
    }

})

module.exports = router;