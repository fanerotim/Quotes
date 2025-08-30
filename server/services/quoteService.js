const mysqlConfig = require("../mySqlConfig")
const db = mysqlConfig();
const { validateInputs } = require('../utils/validateInputs');


const getAll = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM quotes';

        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}

const getQuote = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM quotes WHERE id = ?'

        db.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const getUserQuotes = (userId) => {
    
    return new Promise((resolve, reject) => {
        const sql = `SELECT * 
                    FROM quotes
                    WHERE ownerId = ?`
        db.query(sql, [userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const addQuote = async (author, text, category, ownerId) => {
    // validate input / do not accept empty fields
    validateInputs([author, text, category])

    // TODO: Fix this, adding a conditional check for now
    // adding this additional check as if a request is made through postman and userId is not provided, db gets null added for userId
    if (!ownerId) {
        const error = new Error('You are not authorized to add quotes. Please log in!');
        error.statusCode = 401;
        throw error;
    }

    // first check if quote is added / exists already
    const isQuoteAdded = await new Promise((resolve, reject) => {
        const sql = `
        SELECT *
        FROM quotes
        WHERE LOWER(text) = LOWER(?)`; // checks for quote text (case-insensitive)

        db.query(sql, [text], (err, result) => {
            if (err) {
                return reject({ err })
            }
            return resolve(result);
        })
    })

    // if quote already exists throw error with status code 409
    if (isQuoteAdded.length > 0) {
        const error = new Error('Quote already exists and it cannot be added twice!');
        error.statusCode = 409;
        throw error;
    }

    // if quote does not exist then add the new quote and return a promise
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO quotes 
                    (author, text, ownerId, category)
                    VALUES(?, ?, ?, ?)`;
        db.query(sql, [author, text, ownerId, category], (err, result) => {
            if (err) {
                return reject({ ...err })
            }
            return resolve(result);
        })
    })
}

const updateQuote = (id, author, text, category) => {

    // validate input values before making any db calls
    validateInputs([author, text, category])

    return new Promise((resolve, reject) => {
        const sql = `UPDATE quotes 
                    SET author = ?, text =?, category =?
                    WHERE id = ?`

        db.query(sql, [author, text, category, id], (err, result) => {
            if (err) {
                return reject({ ...err })
            }
            return resolve(result);
        })
    })
}

const deleteQuote = (id) => {
    
    if (!id) {
        throw new Error('Quote id is required in order for the quote to be deleted.')
    }

    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM quotes WHERE id = ?';

        db.query(sql, [id], (err, result) => {
            if (err) {
                return reject({ ...err })
            }
            return resolve(result);
        })
    })
}

module.exports = {
    getAll,
    getQuote,
    getUserQuotes,
    addQuote,
    updateQuote,
    deleteQuote,
}