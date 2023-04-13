const nodemailer = require('nodemailer')
const dotenv = require("dotenv")
dotenv.config()

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