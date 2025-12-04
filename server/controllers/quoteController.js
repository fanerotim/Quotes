const router = require('express').Router();
const quoteService = require('../services/quoteService');
const { isGuest } = require('../route-guards/isGuest');

const { promises } = require('fs');
const { join } = require('path');
const { Resvg } = require('@resvg/resvg-js');

const { createDynamicSvg } = require('../utils/createDynamicSvg');

// this is no longer being used, but keeping in for now;
// router.get('/', async (req, res) => {

//     try {
//         const quotes = await quoteService.getAll();
//         return res.status(200).json(quotes);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// })

router.get('/ogImage/:quoteId', async (req, res) => {
    const { quoteId } = req.params;

    //get quote data / text
    const quoteRequest = await quoteService.getQuote(quoteId);

    // if no quote, we will still get an empty arr
    if (quoteRequest.length < 1) {
        throw new Error('No quote found!')
    }

    const { text, author } = quoteRequest[0];

    // write / create a dynamic svg first by calling the utility / helper fn
    await createDynamicSvg(text, author);

    const svg = await promises.readFile(join(__dirname, '../views/quoteOgImage.svg'))

    const options = {
        background: 'rgba(255, 255, 255, 0.9)',
        textRendering: 1,
    }

    try {
        const resvg = new Resvg(svg, options);
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();
        // when i commented out the content type the facebook bot was able to read the image
        // its new content type is application/octet-stream
        res.set('Content-Type', 'image/png');
        res.set('Content-Length', pngBuffer.length);
        res.send(pngBuffer);
    } catch (err) {
        const statusCode = err.status | 500;
        res.status(statusCode).json({ message: err.message });
    }
})

router.get('/last-three-quotes', async (req, res) => {

    try {
        const mostRecentQuotes = await quoteService.getMostRecentlyAddedQuotes();
        res.status(200).json(mostRecentQuotes)
    } catch (err) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const quote = await quoteService.getQuote(id);
        return res.status(200).json(quote);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
})

router.post('/get-quotes', async (req, res) => {
    const { offset, limit } = req.body;

    try {
        const quotes = await quoteService.getQuotes(offset, limit);
        return res.status(200).json(quotes);
    } catch (err) {
        const status = res.statusCode || 500;
        return res.status(status).json({ message: err.message });
    }
})

router.post('/search-quotes', async (req, res) => {
    const { searchText } = req.body;

    try {
        const searchResult = await quoteService.getSearchedQuotes(searchText);
        return res.status(200).json(searchResult);
    } catch (err) {
        const status = err.statuscode || 500;
        return res.status(status).json({ message: err.message });
    }
})

router.post('/user-quotes', isGuest, async (req, res) => {
    const userId = req.user.id;

    try {
        const userQuotes = await quoteService.getUserQuotes(userId);
        return res.status(200).json(userQuotes);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.post('/add-quote', isGuest, async (req, res) => {
    const ownerId = req.user.id;
    const { author, text, category } = req.body;

    try {
        // add new quote
        const quote = await quoteService.addQuote(author, text, category, ownerId);

        // get new quote to return it to front-end, don't really need to return it, it's a small app, so doesn't cause performane issues (for now)
        const quoteId = quote.insertId; // first get id of newly added quote
        const newQuote = await quoteService.getQuote(quoteId);
        return res.status(200).json(newQuote[0]);
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message });
    }
})

router.post('/add-like', isGuest, async (req, res) => {
    const userId = req.user.id;
    const { quoteId } = req.body;

    try {
        const likeResult = await quoteService.likeQuote(userId, quoteId);
        return res.status(200).json({ message: 'You have successfully liked the quote.' });
    } catch (err) {
        const status = err.statusCode || 400;
        return res.status(status).json({ message: err.message });
    }
})

router.post('/has-liked-quote', async (req, res) => {
    const userId = req.user.id;
    const { quoteId } = req.body;

    try {
        const hasUserLikedQuote = await quoteService.hasLikedQuote(userId, quoteId);
        return res.status(200).json(hasUserLikedQuote);
    } catch (err) {
        const status = err.statusCode || 400;
        return res.status(status).json({ message: err.message });
    }
})

router.post('/get-likes-count', async (req, res) => {
    const { quoteId } = req.body;

    try {
        const likesCount = await quoteService.getLikesCount(quoteId);
        return res.status(200).json(likesCount);
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.put('/edit-quote/:id', isGuest, async (req, res) => {
    const { id } = req.params;
    const { author, text, category } = req.body;

    try {
        //update quote
        const quote = await quoteService.updateQuote(id, author, text, category);
        //return updated quote
        const updatedQuote = await quoteService.getQuote(id);
        return res.status(200).json(updatedQuote)
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message });
    }
})

router.delete('/delete-quote', isGuest, async (req, res) => {
    const { id } = req.body;
    try {
        const deletedQuote = await quoteService.deleteQuote(id);
        return res.status(200).json({ message: 'Quote DELETED successfully.' });
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ message: err.message });
    }
})

module.exports = router;