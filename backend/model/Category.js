const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    id : {type: String, required: true},
    category_name: {type: String, required: true},
})
const Category = mongoose.model("Category", CategorySchema)
module.exports = Category