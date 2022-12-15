const mongoose = require("mongoose");
// const { stringify } = require("querystring");


const userVerificationSchema = new mongoose.Schema({
    id: {type: String},
    uniqueString: {type: String},
    createdAt: {type: String},
    expires : {type: String}
})
const Verify = mongoose.model("Verify", userVerificationSchema);
module.exports = Verify 
