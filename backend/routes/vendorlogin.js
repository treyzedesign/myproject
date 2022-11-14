const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const Vendor = require("../model/vendor");

const vendorLogin = Router()

vendorLogin.get("/vendor-login", (req, res)=>{
    res.send({msg: "welcome back"})
})
vendorLogin.post("/vendor-login", async(req, res)=>{
    const{email, password} = req.body;
    try {
        const vendor_feedback = await Vendor.findOne({email: email})
        if(vendor_feedback){
            const vendor_password = vendor_feedback.password;
            const pass_checker = await bcryptjs.compare(password, vendor_password)
            if(pass_checker){
                console.log("password is matched");
                const vendor_log = {
                    email : email,
                    password: pass_checker
                }
                req.session.vendorLogin = vendor_log
                res.status(200).json({
                    message: "vendor logged in successfully",
                    data:req.session.vendorLogin ,
                    code: "login successful"          
                })
            }
        }else{
            res.status(404).json({msg : "invalid credentials"})
        }
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

module.exports = vendorLogin