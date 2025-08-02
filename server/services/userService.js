const mysqlConfig = require('../mySqlConfig');
const db = mysqlConfig();
const bcrypt = require('bcrypt');

const hasUser = async (email) => {

    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';

        db.query(sql, [email], (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}

const register = async (email, password) => {

    //First check if user with this email is already registered
    const userExists = await hasUser(email);

    // throw error if user already registered (we get an array, so check item at index 0 to verify if user exists)
    if (userExists[0]) {
        throw new Error('User is already registered. Please try again.')
    }
    
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users
                    (email, password)
                    VALUES(?, ?)`;

        db.query(sql, [email, password], (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}



module.exports = {
    register,
    hasUser
}
