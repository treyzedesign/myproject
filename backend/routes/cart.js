const { Router } = require("express");
const bcryptjs = require("bcryptjs")
// const Cart = require("../model/cart")
const Products = require("../model/Products");
const { rawListeners } = require("../model/Products");
// const User = require("../model/signup")
const cartRouter = Router()

// add to cart

cartRouter.post("/carts", async(req, res)=>{
    const{cartId, id , date, brand,productId, quantity} = req.body;
    try {
        if(req.body == undefined){
            res.status(404).json({
                msg:"invalid request"
            })
        }else{
            
            const cartDate = new Date()
            const cart_id = Math.floor(1000 + Math.random() * 9000);
            // const product_id = await Products.findOne({id: '2'}); 
            // const product_poster = await Products.findOne({poster : poster})
            const product = await Products.findOne({id: id})
            if(product){
                const addCart = {
                    cartId : cart_id,
                    date : cartDate,
                    quantity : quantity,
                    productId : product.id
                   

                    
                }
                console.log(addCart);
                req.session.cart_items = addCart
                    res.send({
                        msg: "successful",
                        data: req.session.cart_items

                    })
                    console.log(req.session.cart_items);
                
            }else{
                res.send({
                    msg: "bad request"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})


module.exports = cartRouter;