const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Product = require("../modles/product")
const User = require("../modles/user");
const { count } = require("../modles/product");

const canBeUpdated = async (quantity, id, user, i, action) => {
    try {
        let count = await Product.findOne({ _id: mongoose.Types.ObjectId(id) }, { quantity: 1, _id: 0 })
        if (count.quantity >= quantity) {
            if (action === 'add') {
                await Product.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: { "quantity": (count.quantity - quantity) } })
                user.cart[i].quantity += quantity
                await user.save()
                return true
            }
            else if (user.cart[i].quantity > 0) {
                await Product.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: { "quantity": (count.quantity + quantity) } })
                user.cart[i].quantity -= quantity
                await user.save()
                return true
            }
        }
        else {
            return false
        }
    }
    catch (e) {
        console.log(e)
    }
}


router.get("/api/cart", auth, async (req, res) => {
    try {
        const cart = req.user.cart;
        const products = []
        for (let i = 0; i < cart.length; i++) {
            const pro = await Product.findOne({ _id: cart[i].productId })
            const qua = cart[i].quantity
            const price = (pro.price * qua)
            const temp = {
                quantity: qua,
                name: pro.name,
                price: price,
                brand: pro.brand,
                id: cart[i].productId
            }
            products.push(temp)
        }
        console.log(products)
        res.status(200).send(products);
    } catch (e) {
        res.sendStatus(405);
    }
});

router.post("/api/cart", auth, async (req, res) => {
    try {
        if (req.user.cart.length === 0) {
            req.user.cart.push(req.body.cart)
            await req.user.save()
            count = await Product.findOne({ _id: mongoose.Types.ObjectId(req.body.cart.productId) }, { quantity: 1, _id: 0 })
            await Product.updateOne({ _id: mongoose.Types.ObjectId(req.body.cart.productId) }, { $set: { "quantity": (count.quantity - req.body.cart.quantity) } })
            return res.status(201).send(req.user)
        }
        let com = 1
        for (i = 0; i < req.user.cart.length; i++) {
            const id = req.user.cart[i].productId.toString()
            com = id.localeCompare(req.body.cart.productId)
            if (com === 0) {
                status = await canBeUpdated(req.body.cart.quantity, req.body.cart.productId, req.user, i, 'add')
                if (status === false) {
                    return res.status(405).send("Out of Stock")
                }
            }
        }
        if (com !== 0) {
            cart = [
                ...req.user.cart,
                req.body.cart
            ]
            req.user.cart = cart
            await req.user.save()
        }
        res.status(201).send(req.user);
    } catch (e) {
        console.log(e)
        res.status(405).send();
    }
});

router.patch("/api/cart", auth, async (req, res) => {
    try {
        console.log('patch')
        for (i = 0; i < req.user.cart.length; i++) {
            const id = req.user.cart[i].productId.toString()
            com = id.localeCompare(req.body.cart.productId)
            if (com === 0) {
                status = await canBeUpdated(1, req.body.cart.productId, req.user, i, 'remove')
                if (status === false) {
                    return res.status(405).send("Out of Stock")
                }
            }
            res.status(201).send(req.user.cart)
        }
    }
    catch (e) {
        console.log(e)
        res.sendStatus(405)
    }
});

router.delete("/api/cart", auth, async (req, res) => {
    try {
        req.user.cart = [];
        await req.user.save();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(405);
    }
});

module.exports = router;