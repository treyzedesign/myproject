const mongoose = require("mongoose");
// const { stringify } = require("querystring");


const userSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    tel: {type: String, required: false},
    address: {type: String, required: false},
    state: {type: String, required: false},
    country: {type: String, required: false},
    password: {type: String, required: true},
    verified: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    superAdmin : {type: Boolean, default:false}
},{timestamps: true})
const User = mongoose.model("User", userSchema);



module.exports = User
// module.exports = Admin

// module.exports = { User, Admin }