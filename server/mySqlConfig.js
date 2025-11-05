const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let db = null;

const mysqlConfig = () => {

    const environmentType = process.env.NODE_ENV;

    const dbConfig = {
        'development': {
            host: process.env.DEV_HOST,
            port: process.env.DEV_DB_PORT,
            user: process.env.DEV_USER,
            password: process.env.DEV_PASSWORD,
            database: process.env.DEV_DATABASE,
        },
        'production': {
            host: process.env.PROD_HOST,
            port: process.env.PROD_DB_PORT,
            user: process.env.PROD_USER,
            password: process.env.PROD_PASSWORD,
            database: process.env.PROD_DATABASE,
        }
    }

    if (db) {
        return db;
    }

    db = mysql.createConnection(dbConfig[environmentType])
    return db;
}

module.exports = mysqlConfig;