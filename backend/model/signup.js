const mongoose = require("mongoose");
// const { stringify } = require("querystring");


const userSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    tel: {type: String, required: true},
    address: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean, default: false} 
})
const User = mongoose.model("User", userSchema);



module.exports = User
// module.exports = Admin

// module.exports = { User, Admin }