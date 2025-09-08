const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let db = null;

const mysqlConfig = () => {
    
    if (db) {
        return db;
    }

    db = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
    return db;  
}

module.exports = mysqlConfig;