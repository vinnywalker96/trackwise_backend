import { Double } from "bson";
import mongoose from "mongoose";
import { float } from "webidl-conversions";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    products: [{
        type: Schema.Types.ObjectId, ref: "Product"
    }],
    price: {
        type: Double,
        required: [true, "Price field is required"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

export const Order = mongoose.model("Order", OrderSchema);