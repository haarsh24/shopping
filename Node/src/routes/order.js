const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')

router.get("/api/order", auth, async (req, res) => {
    try {
        console.log(req.user.orders)
        res.status(200).send(req.user.orders);
    } catch (e) {
        res.sendStatus(405);
    }
});

router.post("/api/order", auth, async (req, res) => {
    try {
        const orders = [
            ...req.user.orders,
            req.body.cart
        ]
        console.log(orders)
        req.user.orders = orders
        req.user.cart = []
        console.log(req.user.orders)
        await req.user.save()
        return res.status(201).send()
    } catch (e) {
        console.log(e)
        return res.status(405).send()
    }
})

module.exports = router;