const jwt = require('jsonwebtoken')
const AdminToken = require('../model/AdminToken')
const dotenv = require("dotenv")
dotenv.config()

const Verify = async(req, res, next)=>{
    const authHeader = req.headers.token
    console.log(authHeader);
    const admintoken = await AdminToken.find({authHeader})
    if(admintoken){
        // console.log(admintoken);
        jwt.verify(authHeader, 'ivealwaystriedmybesttomakemymamaandfamilyproudofmebytryingeverythingpossibletomakeitinlifeinGodiwilltrust'
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
    // }
}

module.exports = Verify;