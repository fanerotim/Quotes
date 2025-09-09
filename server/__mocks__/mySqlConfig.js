const users = [
    { id: 1, email: 'i@abv.bg', password: '123' }
]

const mysqlConfig = () => {

    const db = {
        query: (email) => {
            return new Promise((resolve, reject) => {
                if (users[0].email === email) {
                    return resolve(users);
                } else {
                    return reject([]);
                }
            })
        }
    }
    return db;
}

module.exports = mysqlConfig;