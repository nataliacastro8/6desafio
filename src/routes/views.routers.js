import express from "express";
import ProductManager from "../dao/models/ProductManager"

const router = express.Router();
const productManager = new ProductManager();

router.get ("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {products}); 
});

router.get ("/realtimeproducts", (req, res) => {
    res.render ("realTimeProducts"); 
});

export default router;