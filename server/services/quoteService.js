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

const addQuote = (author, text, category) => {
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
    deleteQuote
}