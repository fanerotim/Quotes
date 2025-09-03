const cron = require('node-cron');
const { clearBlacklistedJWTTask } = require('./clearBlacklistedJWTTask');

const clearBlacklistedJWTCron = () => {
    const options = {
        name: 'Clear blacklisted tokens'
    }

    // run at 19:00 every day - once deployed we will reschedule it
    cron.schedule('00 19 * * *', async () => {
        const now = new Date();
        const currentTime = now.toLocaleTimeString();

        try {
            const clearedJWTsResult = await clearBlacklistedJWTTask();
            // logging this for now, will implement a logger
            console.log('cleared all blacklisted tokens from blacklisted_tokens table at', currentTime, ' executed cron-job: ', options.name);
        } catch(err) {
            console.error(err);
        }
    }, options)
}

module.exports = {
    clearBlacklistedJWTCron
}
