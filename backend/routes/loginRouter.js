const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../model/signup")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const UserToken = require("../model/UserToken")
dotenv.config()
const loginRouter = Router()

loginRouter.get("/login", (req, res)=>{
    res.send({msg:"welcome back"})
})
loginRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    const feedback = await User.findOne({email: email });
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
                        Name: feedback.firstName}, process.env.TOKEN_SECRET, {expiresIn: "7d"})
                }
                const userVerified = feedback.verified
                if(userVerified){
                    req.session.login_user = logged;
                    
                    let tokenChecker = await UserToken.findOne({id: feedback.id});
                    if(tokenChecker){
                        await UserToken.updateMany({id: feedback.id},
                            {
                                $set:{
                                    AccessToken: logged.Accesstoken
                                }
                            })
                    }else{
                        await UserToken.create({
                            id: feedback.id,
                            email: email,
                            name: feedback.firstName,
                            AccessToken : logged.Accesstoken
                        })
                    }
                    // let cookieToken = logged.Accesstoken
                    // res.cookie( "userAccessToken", cookieToken,
                    // {
                    //   maxAge: 1000 * 60 * 60 * 6,
                    //   secure: false,
                    //   sameSite: true
                    // })
                    res.status(201).json({
                        message: "User logged in successfully",
                        data: logged.Accesstoken
                    })
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
            res.status(400).json({message:"invalid credentials"})  
        }
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})
loginRouter.get("/login", (req, res)=>{
    
})
module.exports = loginRouter