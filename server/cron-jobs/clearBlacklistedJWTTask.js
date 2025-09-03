const mySqlConfig = require('../mySqlConfig');
const db = mySqlConfig();

const clearBlacklistedJWTTask = async () => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM blacklisted_tokens`;

        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}

module.exports = {
    clearBlacklistedJWTTask
}