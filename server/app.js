const express = require('express');
const mysqlConfig = require('./mySqlConfig');
const expressConfig = require('./expressConfig');
const cors = require('cors');

const app = express();
const db = mysqlConfig(); // create MySQL connection

expressConfig(app); // attach middlewares

// check why this middleware was not executed in expressConfig
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

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


