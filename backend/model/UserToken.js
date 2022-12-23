const mongoose = require("mongoose");

const UsertokenSchema = new mongoose.Schema({
    id : {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    AccessToken : {type: String, required: true}
})
const UserToken = mongoose.model("UserToken", UsertokenSchema)
module.exports = UserToken