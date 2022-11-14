const mongoose = require("mongoose");
// const { stringify } = require("querystring");
const adminSchema = new mongoose.Schema({
    firstName : String,
    lastName: String,
    email: String,
    password: String,
    username : String,
    position : String
 })
const Admin = mongoose.model("Admin", adminSchema)


module.exports = Admin