const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { auth } = require('./middlewares/authMiddleware');
const { clearBlacklistedJWTCron } = require('./cron-jobs/clearBlacklistedJWTCron.js');
const { clearJWTCron } = clearBlacklistedJWTCron();
dotenv.config();

// will be used to route bots - facebookexternalhit crawler mainly, as I want to be able to see a preview of single post when shared on fb;
const botRoutes = require('./router/botRoutes.js')

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

    // listen for requests made from facebookexternalhit bot and route them differently, so i can render meta tags
    app.use((req, res, next) => {
        const userAgent = req.headers['user-agent'];

        // consider replacing this check with a regext and .test() function
        userAgent.includes('facebook')
            ? botRoutes(req, res, next)
            : next();
    })

    return app;
}

module.exports = expressConfig;