const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },

    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    selectedSize: { type: String, enum: ['Small', 'Medium', 'Large'] },
    selectedCrust: { type: String },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
});


const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    discount: { type: Number, default: 0 },
    taxAndCharges : { type : Number, default : 0},

    price: { type: Number, required: true },

    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },

    orderItems: { type: [orderItemSchema] },

    orderStatus: { type: String, enum: ['Kitchen', 'Shipped', 'Delivered'] }
});

module.exports = {
    default : mongoose.model('Order', orderSchema),
    orderItemSchema : orderItemSchema
};