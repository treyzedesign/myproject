
const jwt = require('jsonwebtoken')
const UserToken = require('../model/AdminToken')
const dotenv = require("dotenv")
dotenv.config()

const UserAuth = async(req,res,next) => {
    const authHeader = req.headers.usertoken
    console.log(authHeader);
   
        // console.log(admintoken);
        jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, decode)=>{
            if(err){
                res.status(403).json({
                    msg: err
                })
                
            }
            req.user = decode
            
            next()
        })
   
}
module.exports = UserAuth