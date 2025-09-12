const nodemailer = require('nodemailer');

const setUpTransporter = () => {

    const transporter = nodemailer.createTransport({
        pool: true,
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process.env.TEST_EMAIL,
            pass: process.env.TEST_PASSWORD,
        }
    })

    try {
        transporter.verify();
        console.log('Transporter verified successfully!')
    } catch (err) {
        console.error('Verification failed', err)
    }

    return transporter;
}

module.exports = {
    setUpTransporter
}