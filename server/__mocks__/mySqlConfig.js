const users = [
    { id: 1, email: 'i@abv.bg', password: '123' }
]

const mysqlConfig = () => {

    const db = {
        query: () => {
            return [];
        }
    }
    return db;
}

module.exports = mysqlConfig;