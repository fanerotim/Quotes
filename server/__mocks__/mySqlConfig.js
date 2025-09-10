const users = [
    { id: 1, email: 'i@abv.bg', password: '123' }
]

const mysqlConfig = () => {
    const db = {
        query: (sql, [email], callback) => {
            if (users[0].email === email) {
                callback(null, users);
            } else if (users[0].email !== email) {
                callback(null, []);
            }
        }      
    }
    return db;
}

module.exports = mysqlConfig;