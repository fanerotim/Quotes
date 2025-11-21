const router = require('express').Router();
const quoteService = require('../services/quoteService');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    // logging for debugging purposes. trying to fix social media sharing preview issues
    console.log(req.headers, 'logged from botController')
    try {
        const result = await quoteService.getQuote(id);
        const quoteDetails = result[0];
        res.render('bot', { quoteDetails });
    } catch (err) {
        console.error(err.message);
        throw err;
    }

})

module.exports = router;