import express, { Request, Response } from "express";
const router = express.Router();
import Product from "../models/Product.model";

import dotenv from "dotenv";
dotenv.config();

router.get("/productlist", async (req: Request, res: Response) => {
    const products = await Product.find({});
    return res.send(products);
});

export default router;