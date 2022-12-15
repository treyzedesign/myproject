const nodemailer = require('nodemailer')
const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
    service : "gmail",
    port: 587,
    secure: false,
    host: "smtp.gmail.com",
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
    },
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})

transporter.verify().then((data) => {
    console.log("Transported: ", data)
}).catch(error => {
    console.log('Error right: ', error)
})
module.exports = {
    verifyEmail: async(name, email, token)=>{
    
            const url = "http://localhost:3000/"
            let info = await transporter.sendMail({
                from : process.env.USER,
                to: email,
                subject : "hello" + name + "Please Verify your email",
                html: `<p>Please verify your email address to complete the signup process into your account</p>
                        <p>Click the link<b>(expires in 45 minutes)</b> : <a href=${url + "/user/verify/" + name + "/" + token}> press Here</a> to proceed</p>`
            })
    }
   
    
}