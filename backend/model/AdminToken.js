const mongoose = require("mongoose");

const AdmintokenSchema = new mongoose.Schema({
    id : {type: String, required: true},
    email: {type: String, required: true},
    AccessToken : {type: String, required: true}
})
const AdminToken = mongoose.model("AdminToken", AdmintokenSchema)
module.exports = AdminToken