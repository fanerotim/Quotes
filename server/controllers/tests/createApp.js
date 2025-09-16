const express = require('express');
const expressConfig = require('../../expressConfig');
const routes = require('../../router/routes');
const app = express();

const createApp = () => {
    expressConfig(app);
    app.use(routes);

    return app;
}

module.exports = {
    createApp
}