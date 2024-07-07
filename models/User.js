const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username : { type : String, trim : true, required : true },

    email: { type: String, trim: true, unique: true, required: true },

    password: { type: String, required: true },

    accountType : { type: String, enum: ['Admin', 'Customer'], required: true },

    address : { type : String },

}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);