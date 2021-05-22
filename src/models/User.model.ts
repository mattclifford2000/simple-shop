import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        unique: false,
        required: true,
        min: 2,
        max: 36,
    },
    lastName: {
        type: String,
        unique: false,
        required: true,
        min: 2,
        max: 36,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        min: 6,
    },
    password: {
        type: String,
        unique: false,
        required: true,
        min: 8,
        max: 1024,
    },
    address: {
        type: String,
        unique: false,
        required: true,
        min: 8,
        max: 1024,
    },
    phone: {
        type: String,
        unique: false,
        required: true,
        min: 10,
        max: 10,
    },
    role: {
        type: String,
        unique: false,
        enum: ["user", "admin"],
        required: true,
        default: "user",
    },
    dateofbirth: {
        type: Date,
        unique: false,
        required: true,
    },
    wishlist: {
        type: Array,
        unique: false,
        default: [],
        required: true,
    },
    orders: {
        type: Array,
        unique: false,
        default: [],
        required: true,
    },
    cards: {
        type: Array,
        unique: false,
        default: [],
        required: true,
    },
});

export default mongoose.model<IUser & Document>("User", UserSchema);

type IUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    role: string;
    dateofbirth: Date;
    wishlist: [];
    orders: [];
    cards: [];
};
