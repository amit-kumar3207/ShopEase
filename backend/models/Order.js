
const mongoose = require("mongoose");

// Customer Schema
const customerSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    pincode: String
});

// Product Schema
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number
});

// Order Schema
const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    customer: customerSchema,

    products: [productSchema],

    totalItems: Number,

    totalPrice: Number,

    orderDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: "Pending"
    }

});

// Export Order Model
module.exports = mongoose.model("Order", orderSchema);
