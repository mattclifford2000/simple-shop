import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 6,
        mac: 256
    },
    category: {
        type: String,
        unique: false,
        required: true,
        min: 6,
        max: 64
    },
    description: {
        type: String,
        unique: false,
        required: true,
        min: 10,
        max: 1024
    },
    quantity: {
        type: Number,
        unique: false,
        required: true,
        min: 0,
        max: 999,
        default: 0
    },
    price: {
        type: Number,
        unique: false,
        required: true,
        min: 0.05,
        max: 9999.99,
        default: 10.00
    }
})

export default mongoose.model<IProduct & Document>("Product", ProductSchema)

type IProduct = {
    name: string;
    category: string;
    description: string;
    quantity: number;
    price: number;
}