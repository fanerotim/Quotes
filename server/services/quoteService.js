const mysqlConfig = require("../mySqlConfig")
const db = mysqlConfig();

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

const addQuote = async (author, text, category) => {

    // validate input / do not accept empty fields
    if (
        !author || !author.trim() || 
        !text || !text.trim() ||
        !category || !category.trim()) {
            const error = new Error('All fields must be filled!');
            error.statusCode = 400;
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
                return reject({err})
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
                    (author, text, category)
                    VALUES(?, ?, ?)`;
        db.query(sql, [author, text, category], (err, result) => {
            if (err) {
                return reject({...err})
            }
            return resolve(result);
        })
    })
}

const updateQuote = (id, author, text, category) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE quotes 
                    SET author = ?, text =?, category =?
                    WHERE id = ?`

        db.query(sql, [author, text, category, id], (err, result) => {
            if (err) {
                return reject({...err})
            }
            return resolve(result);
        })
    })
}

const deleteQuote = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM quotes WHERE id = ?';

        db.query(sql, [id], (err, result) => {
            if (err) {
                return reject({...err})
            }
            return resolve(result);
        })
    })
}

module.exports = {
    getAll,
    getQuote,
    addQuote,
    updateQuote,
    deleteQuote,
}