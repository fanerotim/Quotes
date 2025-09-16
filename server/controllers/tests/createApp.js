const createApp = () => {
    const express = require('express');
    const expressConfig = require('../../expressConfig');

    const app = express();
    expressConfig(app);

    const routes = require('../../router/routes');
    app.use(routes);

    return app;
}

module.exports = {
    createApp
}