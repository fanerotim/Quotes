const express = require('express');
const router = express.Router();

//quote controller will hold all routes related to quotes
const quoteController = require('../controllers/quoteController')
router.use('/quotes', quoteController)

module.exports = router;