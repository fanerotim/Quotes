const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { auth } = require('./middlewares/authMiddleware');
dotenv.config();

const expressConfig = (app) => {
    app.use(express.json());
    app.use(auth);
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))

    return app;
}

module.exports = expressConfig;