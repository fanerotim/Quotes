const mysql = require('mysql');

const mysqlConfig = () => {
    return mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })
}

module.exports = mysqlConfig;