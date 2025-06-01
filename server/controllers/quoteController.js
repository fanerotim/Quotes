const mysqlConfig = require('../mySqlConfig');
const router = require('express').Router();
const db = mysqlConfig();
// import quote service
const quoteService = require('../services/quoteService');

router.get('/', async (req, res) => {

    try {
        const quotes = await quoteService.getAll();
        res.status(200).send(quotes);
    } catch (err) {
        // return error message
        throw err.message;
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const quote = await quoteService.getQuote(id);
        res.status(200).send(quote);
    } catch (err) {
        throw err.message;
    }
})

module.exports = router;