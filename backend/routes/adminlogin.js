const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const Admin = require("../model/Admin")
const AdminToken = require("../model/AdminToken")
const jwt = require('jsonwebtoken')
const loginRouter = require("./loginRouter")

const adminLogin = Router()

adminLogin.get("/admin-login", (req, res)=>{
    res.send({msg: "welcome back "})
})
adminLogin.post("/admin-login", async(req, res)=>{
    const{email, password} = req.body;

    try{
        const admin_feedback = await Admin.findOne({email: email})
        if(admin_feedback){
            const admin_password = admin_feedback.password;
            const passwordChecker = await bcryptjs.compare(password, admin_password)
            if(passwordChecker){
                console.log("password matched");
                const checker = {
                    id : admin_feedback.id,
                    email : email,
                    password : passwordChecker,
                    AccessToken : jwt.sign({
                        id: admin_feedback.id,
                        email: email}, process.env.TOKEN_SECRET_KEY, {expiresIn: "24h"})
                } 
                req.session.admin_user = checker
                let cookieToken = checker.AccessToken
                let tokenChecker = await AdminToken.findOne({id: admin_feedback.id})
                if(tokenChecker){
                    await AdminToken.updateMany({id: admin_feedback.id},
                        {
                            $set:{
                                AccessToken : checker.AccessToken
                            }
                        })
                }else{
                    await AdminToken.create({
                        id : admin_feedback.id,
                        email : email,
                        AccessToken : checker.AccessToken
                    })
                }
                
                res.cookie( "AccessToken", cookieToken,
                {
                  maxAge: 1000 * 60 * 60 * 6,
                  secure: false,
                  sameSite: true
                }
              )
                res.status(200).json({
                    message: "admin logged in successfully",
                    code: "login successful"          
                })

            }else{
              res.status(404).json({
                err: "invalid credentials"
              })
            }
           
        } else{
            res.status(404).json({msg: "invalid credentials"})
        }
    }catch(error) {
        res.status(500).json({msg: error})
    }
})

module.exports = adminLogin