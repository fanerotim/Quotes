const express = require('express');
const mysqlConfig = require('./mySqlConfig');
const expressConfig = require('./expressConfig');

const app = express();
const db = mysqlConfig(); // create MySQL connection
expressConfig(app); // attach middlewares

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

