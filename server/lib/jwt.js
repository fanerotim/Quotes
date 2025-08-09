const jwt = require('jsonwebtoken');
const util = require('util');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);
const decode = util.promisify(jwt.decode);

module.exports = {
    sign,
    verify,
    decode
}