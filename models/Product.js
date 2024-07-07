const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    price : { type : Number  , required : true},

    tags: [{ type: String }],

});


module.exports = mongoose.model('Product', productSchema);