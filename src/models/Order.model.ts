import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
    product: {
        type: String,
        unique: false,
        required: true,
    },
    user: {
        type: String,
        unique: false,
        required: true,
    },
    date: {
        type: Date,
        unique: false,
        required: true,
        default: new Date(),
    },
    price: {
        type: Number,
        unique: false,
        required: true,
        min: 0.05,
        max: 9999.99,
    }
})

export default mongoose.model<IOrder & Document>("Order", OrderSchema)

type IOrder = {
    product: string;
    user: string;
    date: Date
    price: number;
}