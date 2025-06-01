const express = require('express');
const mysqlConfig = require('./mySqlConfig');
const expressConfig = require('./expressConfig');

const app = express();
const db = mysqlConfig(); // create MySQL connection

expressConfig(app); // attach middlewares

// import routes and create a middleware that listens for routes on every request
const routes = require('./router/routes');
app.use(routes);

// Connect to DB and start server
db.connect((err) => {
    if (err) {
        throw ({ ...err });
    }
    console.log('Database SUCCESSFULLY connected!');

    app.listen(process.env.API_PORT, () => {
        console.log(`Server successfully started on port ${process.env.API_PORT}`)
    });
})


