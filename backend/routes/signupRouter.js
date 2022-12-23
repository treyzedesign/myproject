
const {Router} = require("express")
const bcrypt = require("bcryptjs")
const User = require("../model/signup")
const nodemailer = require("nodemailer")
const Token = require("../model/token")
const jwt = require('jsonwebtoken')
const signupRouter = Router()
const dotenv = require("dotenv")
dotenv.config()

// add users
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

signupRouter.post("/signup",async (req, res) => {
const {firstName, lastName, email, address, state, country, password} = req.body

try {
    const isUser = await User.findOne({email})
    console.log(isUser);
    const signupHashPass = await bcrypt.hash(password, 10)
    console.log(signupHashPass);
    if(isUser){
        res.status(400).json({msg: "User already exist"})
    }else{ 
        const user_id =  Math.floor(123456 + Math.random() * 999999);
        const newUser = {
            id: user_id,
            firstName: firstName,
            lastName : lastName,
            email: email,
            address: address,
            state : state,
            country: country,
            password: signupHashPass
        }   
        if(newUser){
            const emailToken = jwt.sign({email: email}, 'jesuswillforeverbethemosthighnomatterwhat', {expiresIn : '600000'})
            const onlyToken ={
                token :  emailToken,
                id: user_id,
                email: email,
            }
            const url = "http://localhost:3000/"
            let info = await transporter.sendMail({
                from : process.env.USER,
                to: email,
                subject : "hello" + " " + "(" + firstName + ")" + " " + "Please Verify your email",
                html: `<p>Please verify your email address to complete the signup process into your account</p>
                        <p>Click the link<b>(expires in 6 hours)</b> : <a href=${url + "user/verify/" + email + "/" + emailToken}> press Here</a> to proceed</p>`
            })
            if(info){
                console.log("success");
            }
            let save = await User.create(newUser)
                       await Token.create(onlyToken)
            if(save){
                console.log(save);
                res.status(200).json({
                    data: save,
                    msg: "Email verification sent, Please verify your email before you login"
                })
            }
        }
    }
} catch (error) {
    res.status(500).json({mgs: "Something went wrong, try again", err: error})
}
})

signupRouter.post("/verifyEmail", async(req, res)=>{
    const {mail, emailtoken} = req.body
    console.log(req.body)
    const userEmail = await User.findOne({mail})
    const usertoken = await Token.findOne({emailtoken}) 
    // const real_token = usertoken.token;
    // console.log(real_token);
        try {
            if(userEmail){
                const decode = jwt.verify(usertoken.token, 'jesuswillforeverbethemosthighnomatterwhat', async(err, decode)=>{
                    if(err){
                        console.log("expired")
                        res.json({
                            msg: err
                        })
                       await Token.deleteOne(mail)
                    
                    }
                    if(decode){
                        let edit = User.updateMany({mail},
                            {
                                $set:{
                                    verified: true
                                }
                            }).then((result)=>{
                                console.log(result);
                                res.json({status: 'okay'})
                            }).catch((fail)=>{
                                console.log(fail);
                                res.json({status: 'fail'})
                            })
                            
                    }
                   
                })
                
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({status: "error", msg:error})
        }
})
// get all users
signupRouter.get("/signup", async(req, res) => {
    const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
    const mail = req.params.email  

    try{
        const feedback = await User.find()
        .limit(limit)
        .sort({id : sort})
        

        if(feedback){
            res.status(200).json(feedback)
        }else{
            res.status(401).json({msg:"bad request"})
        }
    }catch(error){
            res.status(500).json({msg: error.message})
    }

})
//get total number of users
signupRouter.get("/signup/total", async(req, res)=>{
    const total = await User.countDocuments({}).exec()
    console.log(total)
    if(total){
        res.status(200).json({
            data: total
        })
    }
})

//get users by id
signupRouter.get("/signup/:id", async(req, res)=>{
    const id = req.params.id;
    const email =req.params.email
    try {
        const feedback = await User.find({id})
        if(feedback){
            res.status(200).json(feedback)
        }else{
            res.status(401).json({msg:"bad request"})
        }
    } catch (error) {
        res.status(500).json({msg: error.message})
        
    }
})

// get users by mail
signupRouter.get("/signup/:email", async(req, res)=>{
    // const id = req.params.id;
    const email =req.params.email
    try {
        const feedback = await User.find({email
        })
        if(feedback){
            res.status(200).json(feedback)
        }else{
            res.status(401).json({msg:"bad request"})
        }
    } catch (error) {
        res.status(500).json({msg: error.message})
        
    }
})



module.exports = signupRouter