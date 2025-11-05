const express = require('express');
const mysqlConfig = require('./mySqlConfig');
const expressConfig = require('./expressConfig');
const handlebarsConfig = require('./handlebarsConfig');
const cors = require('cors');

const app = express();
const db = mysqlConfig(); // create MySQL connection

expressConfig(app); // attach middlewares
handlebarsConfig(app);

const originURL = process.env.NODE_ENV === 'production' ? 'https://fanerotim-quotes.netlify.app' : 'http://localhost:5173';

// check why this middleware was not executed in expressConfig
app.use(cors({
    origin: originURL,
    credentials: true
}))

// import routes and create a middleware that listens for routes on every request
const routes = require('./router/routes');
app.use(routes);

// Connect to DB and start server
db.connect((err) => {
    if (err) {
        console.log('failed to connect to db', err)
        throw ({ ...err });
    }
    console.log('Database SUCCESSFULLY connected!');

    app.listen(process.env.API_PORT, () => {
        console.log(`Server successfully started on port ${process.env.API_PORT}`)
    });
})



