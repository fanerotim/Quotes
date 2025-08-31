const { setUpTransporter } = require('./transporter');

const sendWelcomeEmail = async (recipientEmail) => {
    const transporter = setUpTransporter();

    try {
        const transactionResult = await transporter.sendMail({
            from: "Quotes <info@quotes.fanerotim.dev>",
            to: recipientEmail,
            subject: 'Welcome to Quotes!',
            text: 'We are glad to have you on board'
        })
        return transactionResult;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    sendWelcomeEmail
}