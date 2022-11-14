const {Router} = require("express")
const bcryptjs = require("bcryptjs")
const Admin = require("../model/Admin")
const adminRouter = Router()


// admin
adminRouter.get("/admin", (req, res) =>{
    res.send({msg: 'welcome to the admin'})
})
adminRouter.post("/admin", async (req, res)=>{
    console.log("Hello");
    const {firstName, lastName, password, email,username, position} = req.body;
    try{
        const myAdmin = await Admin.findOne({ email})
        const hashPassword = await bcryptjs.hash(password, 10);
        
        if(myAdmin){
            res.status(401).json({msg:"user already exist"})
        }else{
 
            const newAdmin = await Admin.insertMany({
                firstName : firstName,
                lastName : lastName,
                email:email, 
                password : hashPassword,
                username : username,
                position: position
            })
            console.log(hashPassword);
            console.log(newAdmin);
            

            if(newAdmin){
                const allAdmin= await Admin.create(newAdmin);
                
                res.status(200).json({
                    message: "admin registered successfully"
                })
            }
        }
    }catch(error){
        res.status(500).json({msg: error.message})
    }
})

module.exports = adminRouter