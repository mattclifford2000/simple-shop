import express, { Request, Response } from "express";
const router = express.Router();
import Product from "../models/Product.model";
import dotenv from "dotenv";

dotenv.config();

router.post("/addproduct", async (req: Request, res: Response) => { 
    console.log("Request made to /admin/addproduct");
    const receivedData = req.body;
    console.log("Checking if the name is in use");
    const nameExists = await Product.exists({ name: receivedData.name });
    if (nameExists) {
         console.log("Name in use");
        return res.status(409).send("A product exists with this name.");
    }
    console.log('Unique name.')
    const product = new Product({
        name: receivedData.name,
        category: receivedData.category,
        description: receivedData.description,
        quantity: receivedData.quantity,
        price: receivedData.price,
    });
    await product.save();
    console.log('Product added.');
    return res.status(200).send("Successful product add.");
});

export default router;
