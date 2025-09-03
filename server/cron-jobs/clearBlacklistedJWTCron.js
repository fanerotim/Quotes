const cron = require('node-cron');
const { clearBlacklistedJWTTask } = require('./clearBlacklistedJWTTask');

const clearBlacklistedJWTCron = (req, res, next) => {
    const options = {
        name: 'Clear blacklisted tokens'
    }

    cron.schedule('*/5, * * * *', async () => {
        const now = new Date();
        const currentTime = now.toLocaleTimeString();

        try {
            const clearedJWTsResult = await clearBlacklistedJWTTask();
            // logging this for now, will implement a logger
            console.log('cleared all blacklisted tokens from blacklisted_tokens table at', currentTime);
        } catch(err) {
            console.error(err);
        }
    }, options)

    next();
}

module.exports = {
    clearBlacklistedJWTCron
}
