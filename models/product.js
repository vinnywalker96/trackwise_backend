import mongoose from "mongoose";
import { User } from "./user";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        require: true
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
        type: Schema.Types.ObjectId, ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

export const Product = model("Product", ProductSchema);