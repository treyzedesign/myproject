const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../model/signup")
const loginRouter = Router()

loginRouter.get("/login", (req, res)=>{
    res.send({msg:"welcome back"})
})
loginRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body

    try {
        const feedback = await User.findOne({email: email });
        console.log(feedback)
        if(feedback){
            const saved_Password= feedback.password;
            // console.log(saved_Password);
            const passwordChecker = await bcryptjs.compare(password, saved_Password)

            
            if(passwordChecker){
                console.log("This password matched")
                const logged = {
                    email : email,
                    password: passwordChecker
                }
                req.session.login_user = logged
                res.send({
                    message: "User logged in successfully",
                    data: req.session.login_user,
                    code: "login-success"
                })
            }
            
        }
        else{
            res.status(404).json({msg:"invalid credentials"})  
          }
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})
module.exports = loginRouter