const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    spec: String,
    brand: String,
    price: String,
    category: String,
    poster : String,
    date : String,
    season: String
    
})

const Products = mongoose.model("Products", productschema)

module.exports = Products