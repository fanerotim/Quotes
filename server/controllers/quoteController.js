const router = require('express').Router();
const quoteService = require('../services/quoteService');
const { isAuth } = require('../middlewares/isAuthenticated');

router.get('/', async (req, res) => {

    try {
        const quotes = await quoteService.getAll();
        res.status(200).json(quotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const quote = await quoteService.getQuote(id);
        res.status(200).json(quote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/add-quote', isAuth, async (req, res) => {
    const { author, text, category, ownerId } = req.body;
    
    try {
        // add new quote
        const quote = await quoteService.addQuote(author, text, category, ownerId);

        // get new quote to return it to front-end, don't really need to return it, it's a small app, so doesn't cause performane issues (for now)
        const quoteId = quote.insertId; // first get id of newly added quote
        const newQuote = await quoteService.getQuote(quoteId);
        res.status(200).json(newQuote[0]);
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
})

router.put('/edit-quote/:id', async (req, res) => {
    const { id } = req.params;
    const { author, text, category } = req.body;

    try {
        //update quote
        const quote = await quoteService.updateQuote(id, author, text, category);
        //return updated quote
        const updatedQuote = await quoteService.getQuote(id)
        res.status(200).json(updatedQuote)
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message });
    }
})

router.delete('/delete-quote', async (req, res) => {
    const { id } = req.body;
    try {
        const deletedQuote = await quoteService.deleteQuote(id);
        res.status(200).json({ "message": 'Quote DELETED successfully.' });
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message })
    }
})

module.exports = router;