const express = require('express');
const routes = require('../../router/routes');
const app = express();

const createTestApp = () => {
    // it's important to have express.json() attached to the instance of expres before we attach the routes (otherwise it does not work)
    app.use(express.json())
    app.use(routes);
    return app;
}

module.exports = {
    createTestApp
}