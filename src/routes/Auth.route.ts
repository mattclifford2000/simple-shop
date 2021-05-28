import express, { Request, Response } from "express";
const router = express.Router();
import User from "../models/User.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

router.post("/register", async (req: Request, res: Response) => {
    console.log("Request made to /auth/register");
    const receivedData = req.body;
    console.log("Checking if the email or phone are in use");
    const emailExists = await User.exists({ email: receivedData.email });
    if (emailExists) {
         console.log("Email in use");
        return res.status(409).send("A user exists with this email.");
    }
    const phoneExists = await User.exists({ phone: receivedData.phone });
    if (phoneExists) {
         console.log("Phone in use.");
        return res.status(409).send("A user exists with this phone number.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(receivedData.password, salt);
    let newRole = "user";

    if (receivedData.email.includes("@simpleshop.com.au")) {
        newRole = "admin";
    }

    const user = new User({
        firstName: receivedData.firstName,
        lastName: receivedData.lastName,
        email: receivedData.email,
        phone: receivedData.phone,
        address: receivedData.address,
        password: hashPassword,
        dateofbirth: receivedData.dateofbirth,
        role: newRole,
        wishlist: [],
        orders: [],
        cards: [],
    });

    const savedUser = await user.save();

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (secret === undefined) {
        console.log("Error in environment credentials");
        return res
            .status(500)
            .send(
                "There was an error on our end. We apologise for the inconvenience."
            );
    }

    const authToken = jwt.sign(savedUser.email, secret);
    return res.send({
        token: authToken,
        id: savedUser._id,
        role: savedUser.role,
    });
});

//login user
router.post("/login", async (req, res) => {
    const userCredentials = req.body;
    const user = await User.findOne({ email: userCredentials.email });
    if (!user) {
        console.log("No user with email found.");
        return res
            .status(400)
            .send(
                "Account does not exist with provided email and password combination."
            );
    }
    const validPassword = await bcrypt.compare(
        userCredentials.password,
        user.password
    );
    if (!validPassword) {
        console.log("Incorrect password");
        return res.status(400).send("Incorrect Password");
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (secret === undefined) {
        console.log("Error in environment credentials");
        return res
            .status(500)
            .send(
                "There was an error on our end. We apologise for the inconvenience."
            );
    }
    const authToken = jwt.sign(user.toJSON(), secret);
    return res.send({
        token: authToken,
        role: user.role,
        id: user._id,
    });
});

export default router;
