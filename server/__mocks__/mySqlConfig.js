const users = [
    { id: 1, email: 'i@abv.bg', password: '123' }
]

const mysqlConfig = () => {
    const db = {
        query: (sql, [email], callback) => {
            callback(null, email);
        } 
        // query: jest.fn()
    }
    return db;
}

module.exports = mysqlConfig;