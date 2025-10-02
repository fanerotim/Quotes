const express = require('express');
const router = express.Router();

// bot specific routes
const botController = require('../controllers/botController');

router.use('/quotes', botController);

module.exports = router;