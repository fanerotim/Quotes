const handlebars = require('express-handlebars');

const handlebarsConfig = (app) => {
    app.engine('.hbs', handlebars.engine({ extname: 'hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', 'server/views');
    return app;
}

module.exports = handlebarsConfig;