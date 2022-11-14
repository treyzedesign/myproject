const mongoose = require("mongoose");
// const { stringify } = require("querystring");
const vendorSchema = new mongoose.Schema({
    firstName : String,
    lastName: String,
    username : String,
    email: String,
    companyName : String,
    typeOfBusiness: String,
    phone: String,
    location: String,
    password: String,
 })
const Vendor = mongoose.model("Vendor", vendorSchema)


module.exports = Vendor