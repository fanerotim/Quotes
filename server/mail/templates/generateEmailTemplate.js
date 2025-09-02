const generateEmailTemplate = ({type, email = 'user', password = 'default'}) => {
    switch (type) {
        case 'WELCOME_EMAIL': {
            return `
            <h1>Welcome to our Quotes app ${email}, we are glad to have you on board!</h1>
            <h3>On our platform you can browse quotes that we think are inspiring and worthy!</h3>
            <h4>We cannot wait to see what quotes you'd share as well!</h4>
            `
        }
        case 'PASSWORD_RESET': {
            return `
            <h1>Hey ${email}, don't worry about your password.</h1>
            <h2>We have generated a new password for you, which you can find below.</h2>
            <h1>Your new password is: ${password}</h1>
            <h4>Plese use this password to log in and do not forget to change it to something you can easily remember!</h4>
            <h5>No rush, though! You can change it at any time.</h5>
            `
        }
    }
}

module.exports = {
    generateEmailTemplate
}