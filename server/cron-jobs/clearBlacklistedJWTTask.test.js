const { clearBlacklistedJWTTask } = require('../cron-jobs/clearBlacklistedJWTTask');

test('should return an object', () => {
    return clearBlacklistedJWTTask()
        .then(data => {
            expect(typeof data).toBe('object');
        })
        .catch(err => {
            expect(err).toMatch(Error);
        })
})

test('should return', () => {
    return clearBlacklistedJWTTask()
        .then(data => {
            expect(data).toBeTruthy();
        })
        .catch((err) => {
            expect(err).toMatch(Error);
        })
})

test('should reject', () => {
    return clearBlacklistedJWTTask()
        .catch(err => {
            expect(err).toBe(Error);
        })
})
