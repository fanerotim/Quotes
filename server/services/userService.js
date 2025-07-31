const mysqlConfig = require('../mySqlConfig');
const db = mysqlConfig();

const register = async (email, password) => {
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
    register
}
