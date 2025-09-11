const { setUpTransporter } = require('./transporter');

const sendEmail = async (email, html) => {
    
    const transporter = setUpTransporter();

    try {
        const emailTransaction = await transporter.sendMail({
            from: "Quotes <info@quotes.fanerotim.dev>",
            to: email,
            subject: 'Welcome to Quotes!',
            html: html
        })
        return emailTransaction;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    sendEmail
}