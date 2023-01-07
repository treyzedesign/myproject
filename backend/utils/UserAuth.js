
const jwt = require('jsonwebtoken')
const UserToken = require('../model/AdminToken')
const dotenv = require("dotenv")
dotenv.config()

const UserAuth = async(req,res,next) => {
    const authHeader = req.headers.usertoken
    console.log(authHeader);
    const user = await UserToken.find({authHeader})
    if(user){
        // console.log(admintoken);
        jwt.verify(authHeader, process.env.TOKEN_SECRET
        , (err, decode)=>{
            if(err){
                res.status(403).json({
                    msg: err
                })
                
            }
            
            // req.admin_feedback = decode;
            next()
        })
    }else{
        res.status(401).json({
            msg: "not authenticated"
        })
    }
}
module.exports = UserAuth