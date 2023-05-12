const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
   userId : {type: String, require: true},
   refId : {type: String, require: true},
   product : [
      {
         productId : {type: String},
         productName: {type: String},
         productImage: {type: String},
         quantity : {type: Number, default: 1}
      } 
   ],
   amount : {type: Number, require: true},
   firstname : {type: String, require: true},
   lastname : {type: String, require: true},
   email : {type: String, require: true},
   tel : {type: String, require: true},
   address : {type: String, require: true},
   state : {type: String, require: true},
   status : {type: String, default: "processing"},
   payment : {type: String , default: "on delivery"},
   deliveredAt : {type: Date}
},
 {timestamps: true}
)

const Order = mongoose.model("Order", orderschema)

module.exports = Order