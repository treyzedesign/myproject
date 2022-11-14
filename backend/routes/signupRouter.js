
const {Router} = require("express")
const bcrypt = require("bcryptjs")
const User = require("../model/signup")

const signupRouter = Router()

// add users

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
        // const signupPass = await User.findOne({password : password})
        // console.log(signupPass);
        const user_id =  Math.floor(1000 + Math.random() * 9000);
        const newUser = await User.insertMany({
            id: user_id,
            firstName: firstName,
            lastName : lastName,
            email: email,
            address: address,
            state : state,
            country: country,
            password: signupHashPass
        })
        // console.log(sign);
        if(newUser){
            const user = await User.create(newUser)
            res.status(201).json() 
        }
   }
} catch (error) {
    res.status(500).json({mgs: "Something went wrong, try again"})
}

})

// get all users
signupRouter.get("/signup", async(req, res) => {
    const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
   

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