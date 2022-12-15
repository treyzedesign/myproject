const jwt = require('jsonwebtoken')
const AdminToken = require('../model/AdminToken')
const dotenv = require("dotenv")
dotenv.config()

const Verify = async(req, res, next)=>{
    const authHeader = req.headers.token
    console.log(authHeader);
    // const token = authHeader.split(" ")[1]
    // console.log(token);
    const admintoken = await AdminToken.findOne({authHeader})
    if(admintoken){
        console.log(admintoken);
       await jwt.verify(authHeader, process.env.TOKEN_SECRET_KEY, (err, decode)=>{
            if(err){
                res.status(403).json({
                    msg: err
                })
            }
            if(decode){
                res.status(201).json({msg: decode})
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

module.exports = Verify;