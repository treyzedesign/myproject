const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../model/signup")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const loginRouter = Router()

loginRouter.get("/login", (req, res)=>{
    res.send({msg:"welcome back"})
})
loginRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    const feedback = await User.findOne({email: email });
    // const savedEmail = feedback.email
    // console.log(savedEmail);
    
    // console.log(feedback.firstName)
    try {
        if(feedback){
            const saved_Password= feedback.password;
            const passwordChecker = await bcryptjs.compare(password, saved_Password)
            if(passwordChecker){
                const logged = {
                    id : feedback.id,
                    email : email,
                    password: passwordChecker,
                    Name : feedback.firstName,
                    Accesstoken : jwt.sign({
                        id: feedback.id,
                        email: email,
                        Name: feedback.firstName}, process.env.TOKEN_SECRET, {expiresIn: "1h"})
                }
                const userVerified = feedback.verified
                if(userVerified){
                    req.session.login_user = logged
                    res.status(201).json({
                        message: "User logged in successfully",
                        data: {
                            id : logged.id,
                            email : logged.email,
                            Accesstoken : logged.Accesstoken
                        },
                        code: "login-success"
                    })
                    console.log('success');
                }else{
                    res.status(401).json({
                        message:"Account not Verified"
                    })
                }
            }else{
                res.status(400).json({
                    message:"invalid credentials"
                })
            }
            
        }
        else{
            console.log('faill');
            res.status(400).json({msg:"invalid credentials"})  
        }
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})
loginRouter.get("/login", (req, res)=>{
    
})
module.exports = loginRouter