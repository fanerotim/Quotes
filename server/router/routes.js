const express = require('express');
const router = express.Router();

//quote controller will hold all routes related to quotes
const quoteController = require('../controllers/quoteController');
const userController = require('../controllers/userController');

router.use('/quotes', quoteController)
router.use('/user', userController)

module.exports = router;