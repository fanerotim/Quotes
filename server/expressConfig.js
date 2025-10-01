const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { auth } = require('./middlewares/authMiddleware');
const { clearBlacklistedJWTCron } = require('./cron-jobs/clearBlacklistedJWTCron.js');
const { clearJWTCron } = clearBlacklistedJWTCron();
dotenv.config();

const botSpecificRoutes = require('./router/botSpecificRoutes.js')

const expressConfig = (app) => {
    // not needed for now, but once I am ready to add images to og metadata it will be required
    // app.use(express.static('server/static'))
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
    app.use(auth);
    // initialize cron responsible for clearing blacklisted tokens
    clearJWTCron.start();

    app.use((req, res, next) => {
        const userAgent = req.headers['user-agent'];
        const { id } = req.params;

        userAgent.includes('facebook')
            ? botSpecificRoutes(req, res, next)
            : next();
    })

    return app;
}

module.exports = expressConfig;