const userService = require('../userService');

test('resolves', () => {
    return userService.hasUser('i@abv.bg')
        .then(userData => {
            expect(userData).toBeTruthy();
        })
})

test('rejects', () => {
    return userService.hasUser('adsaoi')
        .then(userData => {
            expect(userData.length).toEqual(0);
        })
})