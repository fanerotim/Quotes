// use this library for now to finish the feature, but build my own password generator once i have more time
const generator = require('generate-password');

const generateRandomPassword = () => {

    const password = generator.generate({
        length: 30,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true
    })
    return password;
}

module.exports = {
    generateRandomPassword
}