const fs = require('node:fs/promises');
const path = require('path');

const LOG_PATHS = {
    ACCESS_LOG: path.join(__dirname, '../logs/access.log'),
    CRON_LOG: path.join(__dirname, '../logs/cron.log')
}

const logger = async (type, content) => {

    const data = JSON.stringify(content);
    const PATH = LOG_PATHS[type]

    try {
        await fs.appendFile(PATH, `\n${data}`, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    logger
}