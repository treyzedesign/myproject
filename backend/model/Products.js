const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    id: {type: String, require: true},
    title: {type: String, require: true},
    description: {type: String, require: true},
    spec: {type: String, require: true},
    brand: {type: String, require: true},
    price: {type: String, require: true},
    category: {type: String, require: true},
    poster : {type: String, require: true},
    date : {type: String, require: true},
    season: {type: String, require: true}
    
})

const Products = mongoose.model("Products", productschema)

module.exports = Products