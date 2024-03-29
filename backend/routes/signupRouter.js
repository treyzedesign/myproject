
const {Router} = require("express")
const bcrypt = require("bcryptjs")
const User = require("../model/signup")
const nodemailer = require("nodemailer")
const Token = require("../model/token")
const jwt = require('jsonwebtoken')
const signupRouter = Router()
const dotenv = require("dotenv")
const UserAuth = require("../utils/UserAuth")
const Verify = require("../utils/Auth")

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

// REGISTER USER
signupRouter.post("/signup",async (req, res) => {
const {firstName, lastName, email,tel, address, state, country, password} = req.body

try {
    const isUser = await User.findOne({email})
    console.log(isUser);
    const signupHashPass = await bcrypt.hash(password, 10)
    console.log(signupHashPass);
    const total = await User.countDocuments({})
    
    if (total < 1){
        const user_id =  Math.floor(123456 + Math.random() * 999999);
        const newUser = {
            id: user_id,
            firstName: firstName,
            lastName : lastName,
            email: email,
            tel: tel,
            address: address,
            state : state,
            country: country,
            password: signupHashPass,
            superAdmin: true
        }   
        if(newUser){
            const emailToken = jwt.sign({email: email}, process.env.EMAIL_SECRET)
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
                    //    await Token.create(onlyToken)
            if(save){
                console.log(save);
                res.status(200).json({
                    data: save,
                    msg: "Email verification sent, Please verify your email before you login"
                })
            }
        }
    }else{
        if(isUser){
            res.status(400).json({
                message: "user already exists"
            })
        }else{
            const user_id =  Math.floor(123456 + Math.random() * 999999);
            const newUser = {
                id: user_id,
                firstName: firstName,
                lastName : lastName,
                email: email,
                tel: tel,
                address: address,
                state : state,
                country: country,
                password: signupHashPass,
            }   
            if(newUser){
                const emailToken = jwt.sign({email: email}, process.env.EMAIL_SECRET)
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
                        //    await Token.create(onlyToken)
                if(save){
                    console.log(save);
                    res.status(200).json({
                        data: save,
                        msg: "Email verification sent, Please verify your email before you login"
                    })
                }
            }
        }
    }
        
    
} catch (error) {
    res.status(500).json({mgs: "Something went wrong, try again", err: error})
}
})

// Resend email again
signupRouter.post("/resend_mail", async(req,res)=>{
    try {
        const{email, firstName} = req.body
        const emailToken = jwt.sign({email: email}, process.env.EMAIL_SECRET)
        const url = "http://localhost:3000/"
                let info = await transporter.sendMail({
                    from : process.env.USER,
                    to: email,
                    subject : "hello" + " " + "(" + firstName + ")" + " " + "Please Verify your email",
                    html: `<p>Please verify your email address to complete the signup process into your account</p>
                            <p>Click the link<b>(expires in 6 hours)</b> : <a href=${url + "user/verify/" + email + "/" + emailToken}> press Here</a> to proceed</p>`
                })
                if(info){
                    res.status(200).json({
                        msg:"email sent"
                    });
                }
    } catch (error) {
        res.status(500).json({
            mgs: error.message
            
        
        })
    }
})


//forgot Password
signupRouter.post("/signup/password", async(req,res)=>{
    const {email} = req.body
    try {
        const feedback = await User.findOne({email: email})
        
        if(feedback){
            const url = "http://localhost:3000/"
            let info = await transporter.sendMail({
                from : process.env.USER,
                to: email,
                subject : "hello" + " " + "(" + feedback.firstName + ")" + " " + "(Change Of Password)",
                html: `<p>Please click the link the below to change your password</p>
                        <p>Click the link : <a href=${url + "change_password/" + feedback.id }> press Here</a> to proceed</p>`
            }).then((feedback)=>{
                res.send(feedback)
            }).catch((fail)=>{
                res.send(fail)
            })
            
        }else{
            res.status(401).json({
                msg: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            mgs: "error"
            

        })
    }
})

// send user a mail 
signupRouter.post("/signup/send-message", Verify, async(req,res)=>{
    const {email, name, subject, body} = req.body
    try {
        let info = await transporter.sendMail({
            from : process.env.USER,
            to: email,
            subject : `${subject}`,
            html: `<body>
                        <div>
                            <p>hello ${name}, </p>
                            <div> ${body}</div>
                        </div>
                    </body>`
        }).then((feedback)=>{
            res.status(200).json({data: feedback, msg: "success"})
        }).catch((fail)=>{
            res.send(fail)
        })
    } catch (error) {
        res.status(500).json({
            mgs: error
        })
    }
})

// check for password 
signupRouter.post('/signup/checkpassword/:id', UserAuth, async(req,res)=>{
    const {password} = req.body
    const id = req.params.id
    let finder = await User.findOne({id : id})
    console.log(finder);
    try {
        if(finder){
            const cur_pass = finder.password
            console.log(cur_pass);
            const compare = await bcrypt.compare(password, cur_pass)
            if(compare){
                res.status(200).json({msg: 'matches'})
            }else{
                res.status(401).json({msg: "no match"})
            }
        }
    } catch (error) {
        res.status(500).json({msg: error})
    }  
})

// change password
signupRouter.patch('/signup/changePassword', async (req, res)=>{
    const {id, password} = req.body
            const hasher = await bcrypt.hash(password, 10)
            // console.log(hasher);
            await User.findOne({id: id}).updateOne({
                $set : {
                    password : hasher
                }
            }).then((feedback)=>{
                res.send(feedback)
            }).catch((fail)=>{
                res.send(fail)
            })
    
})
// Verify Email
signupRouter.post("/verifyEmail", async(req, res)=>{
    const {mail, emailtoken} = req.body
    console.log(req.body)
    const userEmail = await User.findOne({mail})
    const usertoken = await Token.findOne({emailtoken}) 
    // const real_token = usertoken.token;
    // console.log(real_token);
        try {
            if(userEmail){
                const decode = jwt.verify(usertoken.token, process.env.EMAIL_SECRET, async(err, decode)=>{
                    if(err){
                        console.log("expired")
                        res.json({
                            msg: err
                        })
                       await Token.deleteOne(mail)
                    
                    }
                    if(decode){
                        let edit = await User.updateMany({mail},
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
            res.status(500).json({msg: error})
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
        res.status(500).json({msg: error})
        
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

// update User 
signupRouter.patch("/signup/:id", UserAuth ,async(req, res)=>{
    // console.log(req.user.isAdmin);
    try {
        if (typeof req.body == undefined || req.params.id == null) {
            res.json({
                status: 'error',
                message: 'something went wrong! check your sent data',
            });
        }else{
            let obj = {
                tel : req.body.tel_phone,
                address: req.body.address,
                state: req.body.state,
                country : req.body.country
            }
            let edit = await User.findOne({id: req.params.id}).updateMany(obj)

            if(edit){
                res.status(200).json({
                    message: "updated successfully"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// Delete a user
signupRouter.delete('/deleteUser/:id', UserAuth, async(req,res)=>{
    try {
        if(req.user.superAdmin == true){
            const finder = await User.findOne({id : req.params.id}).deleteOne()
            if(finder){
                res.status(200).json({
                    message: "Deleted successfully"
                })
            }
        }else{
            res.status(403).json({
                message: "Unauthorized action"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// make user an Admin

signupRouter.patch("/makeAdmin/:id", UserAuth,async(req,res)=>{
    try {
        if (typeof req.body == undefined || req.params.id == null) {
            res.json({
                status: 'error',
                message: 'something went wrong! check your sent data',
            });
        }else{
            if (req.user.superAdmin == true){
                let find_Id = await User.findOne({id: req.params.id}).updateOne({
                    $set:{
                        isAdmin : true
                    }
                })
                if (find_Id){
                    res.status(200).json({
                        message: "role has been update succesfully"
                    })
                }
            }else{
                res.status(403).json({
                    message: "Unauthorized action"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// remove user from admin

signupRouter.patch("/removeAdmin/:id",UserAuth, async(req,res)=>{
    try {
        if (typeof req.body == undefined || req.params.id == null) {
            res.json({
                status: 'error',
                message: 'something went wrong! check your sent data',
            });
        }else{
            if (req.user.superAdmin == true){
                let find_Id = await User.findOne({id: req.params.id}).updateOne({
                    $set:{
                        isAdmin : false
                    }
                })
                if (find_Id){
                    res.status(200).json({
                        message: "admin has been removed succesfully"
                    })
                }
            }else{
                res.status(403).json({
                    message: "Unauthorized action"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// get all Admins
signupRouter.get('/getAllAdmin', UserAuth, async(req,res)=>{
    try {
        let myfinder = await User.find({isAdmin: true})
        if(myfinder){
            res.status(200).json({
                data: myfinder
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// remove All admins
signupRouter.patch('/removeAllAdmin', UserAuth, async(req,res)=>{
    try {
        if(req.user.superAdmin == true){
            const query = await User.find({isAdmin: true}).updateMany({
                $set:{
                    isAdmin: false
                }
            })
            if(query){
                res.status(200).json({
                    message: "removed admins successfully"
                })
            }
        }else{
            res.status(403).json({
                message: "Unauthorized action"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

module.exports = signupRouter
