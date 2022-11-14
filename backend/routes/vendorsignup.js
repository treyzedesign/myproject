const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const Vendor = require("../model/vendor")
const e = require("express")

const vendorRouter = Router()

vendorRouter.get("/vendor", (req, res)=>{
    res.send({msg: "welcome"}) 
})
vendorRouter.post("/vendor", async(req, res) =>{
    const { 
            firstName,
            lastName,
            username,
            email,
            companyName,
            typeOfBusiness,
            phone,
            location,
            password 
        } = req.body
    try {
        const vendorUser = await Vendor.findOne({email})
        
        const vpass = await bcryptjs.hash(password, 10)

        console.log(vpass);


        if(vendorUser){
            res.status(400).json({msg: "User already exist"})
        }else{

           const newVendor = await Vendor.insertMany({
            firstName: firstName,
            lastName : lastName,
            username : username,
            email : email,
            companyName : companyName,
            typeOfBusiness : typeOfBusiness,
            phone : phone,
            location : location,
            password : vpass
            })
            console.log(vpass);
            if(newVendor){
                const vendorUser = await Vendor.create(newVendor);
                console.log(newVendor);
                res.status(200).json(vendorUser) 
            }
       }
    } catch (error) {
        res.status(500).json({mgs: error.message})
    }
})


module.exports = vendorRouter;