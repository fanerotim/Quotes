const router = require('express').Router();
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

router.post('/add-quote', async (req, res) => {
    const { author, text, category } = req.body;
    
    try {
        // TODO: ERROR HANDLING - CHECK IF QUOTE EXISTS
        // add new quote
        const quote = await quoteService.addQuote(author, text, category);
        // get new quote
        const quoteId = quote.insertId; // first get id of newly added quote
        const newQuote = await quoteService.getQuote(quoteId);
        res.status(200).send(newQuote[0]);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.put('/update-quote', async (req, res) => {
    const {id, author, text, category} = req.body;
    
    try {
        //update quote
        const quote = await quoteService.updateQuote(id, author, text, category);
        //return updated quote
        const updatedQuote = await quoteService.getQuote(id)
        res.status(200).send(updatedQuote)
    } catch (err) {
        return res.status(500).send({...err});
    }   
})

router.delete('/delete-quote', async (req, res) => {
    const {id} = req.body;

    try {
        const deletedQuote = await quoteService.deleteQuote(id);
        res.status(200).send('Quote DELETED successfully.');
    } catch(err) {
        return res.status(500).send({...err})
    }
})

module.exports = router;