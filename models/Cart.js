const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    orderItems: [
        {
            productName: { type: String, required: true },
            description: { type: String },
            image: { type: String, required: true },

            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema)