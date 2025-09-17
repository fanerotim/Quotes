const express = require('express');
const expressConfig = require('../../expressConfig');
const routes = require('../../router/routes');
const app = express();

const createTestApp = () => {
    expressConfig(app);
    app.use(routes);

    return app;
}

module.exports = {
    createTestApp
}