const router = require('express').Router();
const quoteService = require('../services/quoteService');
const { isAuth } = require('../middlewares/isAuthenticated');
const {auth} = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {

    try {
        const quotes = await quoteService.getAll();
        res.status(200).json(quotes);
    } catch (err) {
        throw err.message;
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const quote = await quoteService.getQuote(id);
        res.status(200).json(quote);
    } catch (err) {
        throw err.message;
    }
})

router.post('/add-quote', isAuth, async (req, res) => {
    const { author, text, category } = req.body;
    // TODO: UPDATE TABLE TEXT COLUMN DEFINITION / LIMITS CHARACTERS TOO MUCH
    try {
        // TODO: ERROR HANDLING - CHECK IF QUOTE EXISTS
        // add new quote
        const quote = await quoteService.addQuote(author, text, category);
        console.log(quote);
        // get new quote
        const quoteId = quote.insertId; // first get id of newly added quote
        const newQuote = await quoteService.getQuote(quoteId);
        res.status(200).json(newQuote[0]);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/edit-quote/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { author, text, category } = req.body;

    try {
        //update quote
        const quote = await quoteService.updateQuote(id, author, text, category);
        //return updated quote
        const updatedQuote = await quoteService.getQuote(id)
        res.status(200).json(updatedQuote)
    } catch (err) {
        return res.status(500).json({ ...err });
    }
})

router.delete('/delete-quote', async (req, res) => {
    const { id } = req.body;
    try {
        const deletedQuote = await quoteService.deleteQuote(id);
        res.status(200).json({ "message": 'Quote DELETED successfully.' });
    } catch (err) {
        return res.status(500).json({ ...err })
    }
})

module.exports = router;