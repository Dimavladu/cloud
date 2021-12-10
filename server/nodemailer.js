const nodemailer = require('nodemailer')
const config = require('./key.json')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth:{
            user: config.email,
            pass: config.password
        }
    },
    {
        from: `BEER CLOUD <${config.email}>`
    }
)

const mailer = (message) => {
    transporter.sendMail(message, (err, info) =>{
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer