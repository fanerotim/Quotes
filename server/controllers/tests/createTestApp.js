const express = require('express');
const routes = require('../../router/routes');
const app = express();

const createTestApp = () => {
    app.use(routes);
    return app;
}

module.exports = {
    createTestApp
}