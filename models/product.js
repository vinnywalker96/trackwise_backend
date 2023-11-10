const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    brand:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true,   
    },
    created_by: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Product", ProductSchema);