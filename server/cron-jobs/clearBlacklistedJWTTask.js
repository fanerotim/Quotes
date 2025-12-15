const mySqlConfig = require('../mySqlConfig');
const db = mySqlConfig();

const clearBlacklistedJWTTask = async () => {

    // In the future I may change this to only clear certain tokens: filter based on a criteria (e.g. date, some flag or anything else)
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