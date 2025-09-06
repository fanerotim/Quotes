const userService = require('../userService');

test('should return user data', () => {

    userService.hasUser = jest.fn((email) => {
        return Promise.resolve([{ id: 1, email: 'i@abv.bg', password: 'abv' }])
    })

    return userService.hasUser('i@abv.bg')
        .then(result => {
            expect(result).toEqual([{ id: 1, email: 'i@abv.bg', password: 'abv' }])
        })
})

test('should return empty array', () => {
    userService.hasUser = jest.fn((email) => {
        return Promise.resolve([]);
    })

    return userService.hasUser('p@abv.bg')
        .then(result => {
            expect(result).toEqual([]);
        })
})