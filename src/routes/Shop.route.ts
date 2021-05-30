import express, { Request, Response } from "express";
const router = express.Router();
import Product from "../models/Product.model";

import dotenv from "dotenv";
dotenv.config();

router.get("/productlist", async (req: Request, res: Response) => {
    const products = await Product.find({});
    return res.send(products);
});

router.get("/product/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;
    console.log('Request made to /shop/product');
    const product = await Product.findOne({ _id: id });
    if (!product) {
        console.log("No product with id found.");
        return res
            .status(400)
            .send(
                "Product does not exist with provided ID."
            );
    }
    console.log('Product found');
    const name: string = product.name;
    const category: string = product.category;
    const description: string = product.description;
    const quantity: number = product.quantity;
    const price: number = product.price;
    console.log('Details successfully set.');
    return res.status(200).send({name: name, category: category, description: description, quantity: quantity, price: price})
});

export default router;