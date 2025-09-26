const mysqlConfig = require("../mySqlConfig")
const db = mysqlConfig();
const { validateInputs } = require('../utils/validateInputs');

const getAll = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM quotes';

        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } 
            return resolve(result);
        })
    })
}

const getQuotes = (offset, limit) => {

    // TODO; write proper validation. keeping it like this for now as if any of those value are 0 (which is valid), !offset or !limit will be false and it breaks app
    if (offset === undefined || limit === undefined) {
        const error = new Error('Something went wrong. Please try again.');
        error.statusCode = 400;
        throw error;
    }

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM quotes LIMIT ?, ?`

        db.query(sql, [offset, limit], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const getQuote = (id) => {
    
    if (!id) {
        const error = new Error('quoteId must be provided');
        error.statusCode = 400;
        throw error;
    }

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

    if (!userId) {
        const error = new Error('userId must be provided');
        error.statusCode = 400;
        throw error;
    }

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
        const error = new Error('Quote already exists and it cannot be duplicated!');
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
                return reject(err)
            }
            return resolve(result);
        })
    })
}

const deleteQuote = (id) => {

    if (!id) {
        throw new Error('Invalid request!')
    }

    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM quotes WHERE id = ?';

        db.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}

module.exports = {
    getAll,
    getQuotes,
    getQuote,
    getUserQuotes,
    addQuote,
    updateQuote,
    deleteQuote,
}