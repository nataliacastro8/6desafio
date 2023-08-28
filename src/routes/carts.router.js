import { Router } from "express";
import CartManager from "../dao/CartManager.js"

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.post ("/", async (req, res) => {
    const newCart = await cartManager.newCart();

    if(newCart){
        res.send({status:"ok", message: "Carrito creado correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No se creo el carrito"});
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartManager.getCart(cid);

    if (cart){
        res.send({products:cart.products});
    }else{
        res.status(400).send({status:"error", message: "Error! No se creo el ID del carrito"});
    }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await cartManager.addProductToCart(cid, pid);

    if(result) {
        res.send({status:"ok", message: "El producto se agrego correctamente"});
       } else {
        res.status(400).send({status:"error", message: "Error! No se agrego el producto al carrito"});
       }
});


export default cartsRouter;