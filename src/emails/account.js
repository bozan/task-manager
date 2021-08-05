const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'beyza.ozan@getir.com',
        subject: 'Welcome to the Task App!',
        text: 'Welcome to the app, '+name+'. Thanks for joining in!'
    
    })
}

const cancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'beyza.ozan@getir.com',
        subject: 'Goodbye..',
        text: 'We are sorry that you deleted your account. Could you explain why you left us '+name+'?'
    })
}
module.exports = {
    sendWelcomeEmail,
    cancelationEmail
}


