const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    surname: {
        type: String,
        required: [true, "Please enter your surname"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "This email is already registered"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: Schema.Types.ObjectId, ref: "Product"
    }],
    orders: [{
        type: Schema.Types.ObjectId, ref: "Order"
    }]

}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);