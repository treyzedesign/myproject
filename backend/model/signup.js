const mongoose = require("mongoose");
// const { stringify } = require("querystring");


const userSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    state: String,
    country: String,
    password: String,

})
const User = mongoose.model("User", userSchema);



module.exports = User
// module.exports = Admin

// module.exports = { User, Admin }