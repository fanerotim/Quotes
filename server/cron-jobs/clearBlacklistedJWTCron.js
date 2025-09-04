const cron = require('node-cron');
const { clearBlacklistedJWTTask } = require('./clearBlacklistedJWTTask');
const { logger } = require('../logger/logger');

const clearBlacklistedJWTCron = () => {
    const options = {
        name: 'Clear blacklisted tokens'
    }

    // run at 19:00 every day - once deployed we will reschedule it
    cron.schedule('06 20 * * *', async () => {
        const now = new Date();
        const currentTime = now.toLocaleTimeString();

        try {
            const clearedJWTsResult = await clearBlacklistedJWTTask();
            // log cron execution into cron log
            logger('CRON_LOG', {type: 'cron execution', cron_name: options.name, time: currentTime, date: new Date().toDateString(), message: 'successfully cleared blacklisted_tokens table'})
        } catch (err) {
            console.error(err);
        }
    }, options)
}

module.exports = {
    clearBlacklistedJWTCron
}
