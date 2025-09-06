const userService = require('../userService');

test('should return user data', () => {
    userService.hasUser = jest.fn().mockReturnValue([{id: 1, email: 'i@abv.bg', password: 'asd'}]);

    return userService.hasUser()
        .then(result => {
        expect(result).toEqual([{id: 1, email: 'i@abv.bg', password: 'asd'}])
    })
})

// test('resolves', () => {
//     return userService.hasUser('i@abv.bg')
//         .then(userData => {
//             expect(userData).toBeTruthy();
//         })
// })

// test('rejects', () => {
//     return userService.hasUser('adsaoi')
//         .then(userData => {
//             expect(userData.length).toEqual(0);
//         })
// })