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

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM quotes';

    db.query(sql, (err, result) => {
        if (err) {
            throw {...err}
        }
        res.status(200).send(result);
    })
})

app.get('/create-database', (req, res) => {
    const sql = 'CREATE DATABASE quotes2';
    db.query(sql, (err, result) => {
        if (err) {
            throw { ...err }
        }
        res.status(200).send('Database SUCCESSFULLY created!', result)
    })
})

app.get('/drop-database', (req, res) => {
    const sql = 'DROP DATABASE quotes2';

    db.query(sql, (err, result) => {
        if (err) {
            // res.status(500).send({...err})
            throw { ...err }
        }
        res.status(200).send('Database SUCCESSFULLY dropped.')
    })
})

app.get('/create-table', (req, res) => {
    const sql =
        `CREATE TABLE quotes(
            id INT PRIMARY KEY AUTO_INCREMENT,
            author VARCHAR(50) NOT NULL,
            text VARCHAR(255) NOT NULL,
            category ENUM('Sport', 'Fantasy', 'Comedy', 'History'));`

    db.query(sql, (err, result) => {
        if (err) {
            throw {...err}
        }
        res.status(200).send('Database table SUCCESSFULLY created!')
    })
})
