import { Router } from "express";
import CartManager from "../dao/CartManager.js"

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.post ("/", (req, res) => {
    if(cartManager.newCart()){
        res.send({status:"ok", message: "Carrito creado correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No se creo el carrito"});
    }
});

cartsRouter.get("/:cid", (req, res) => {
    const cid = Number(req.params.cid);
    const cart = cartManager.getCart(cid);

    if (cart){
        res.send({products:cart.products});
    }else{
        res.status(400).send({status:"error", message: "Error! No se creo el ID del carrito"});
    }
});

cartsRouter.post("/:cid/products/:pid", (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const cart = cartManager.getCart(cid);

    if(cart) {
       if(cartManager.addProductToCart(cid,pid)){
        res.send({status:"ok", message: "El producto se agrego correctamente"});
       }else{
        res.status(400).send({status:"error", message: "Error! No se agrego el producto al carrito"});
       }
    } else {
        res.status(400).send({status:"error", message: "Error! No se encontro el id de carrito"})
    }

});


export default cartsRouter;