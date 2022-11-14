const mongoose = require("mongoose");
const schema = mongoose.Schema
const Products = require("./Products")
const User = require("./signup")

const Cartschema = new schema({
    cartId: String,
    userId: String,
    date: String,
    product: {
        productId : String,
        poster: String,
        brand: String,
        price: String,
        title: String
    },
    quantity: String,
    poster: String,

    
})

   


const Cart = mongoose.model("Cart", Cartschema)

module.exports = Cart;