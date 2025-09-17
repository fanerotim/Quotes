const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { auth } = require('./middlewares/authMiddleware');
const { clearBlacklistedJWTCron } = require('./cron-jobs/clearBlacklistedJWTCron.js');
const { clearJWTCron } = clearBlacklistedJWTCron();
dotenv.config();

const expressConfig = (app) => {
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
    app.use(auth);
    // initialize cron responsible for clearing blacklisted tokens
    clearJWTCron.start();
    return app;
}

module.exports = expressConfig;