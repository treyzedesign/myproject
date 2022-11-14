const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const Admin = require("../model/Admin")
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
                    email : email,
                    password : passwordChecker
                } 
                req.session.admin_user = checker

                res.status(200).json({
                    message: "admin logged in successfully",
                    data:req.session.admin_user ,
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
        res.status(500).json({msg:error.message})
    }
})

module.exports = adminLogin