const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../modles/product");
const Product = require("../modles/product");
const mongoose = require("mongoose");

const canBeUpdated = [
    "name",
    "category",
    "inStock",
    "quantity",
    "price",
    "brand",
    "expiry",
];

router.get("/api/product", async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).send(task);
    } catch (e) {
        res.status(405).send();
    }
});

router.post("/api/productId", async (req, res) => {
    try {
        console.log(req.body)
        const task = await Task.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });
        console.log(task)
        res.status(200).send(task)
    } catch (e) {
        res.status(405).send()
    }
})

router.post("/api/product", auth, async (req, res) => {
    try {
        console.log(req.header)
        if (req.body.expiry) {
            req.body.expiry = new Date(req.body.expiry);
        }
        const toBeUpdated = Object.keys(req.body);
        const isValid = toBeUpdated.every((update) =>
            canBeUpdated.includes(update)
        );
        if (!isValid) {
            res.status(405).send("key not found");
        }
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (e) {
        console.log(e);
        res.status(405).send();
    }
});

router.patch("/api/product", auth, async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: mongoose.Types.ObjectId(req.body._id),
        });
        if (!product) {
            res.status(405).send("product not found");
        }
        const toBeChanged = Object.keys(req.body);

        toBeChanged.splice(toBeChanged.indexOf("_id"), 1);
        const isvalid = toBeChanged.every((update) =>
            canBeUpdated.includes(update)
        );
        if (!isvalid) {
            res.status(405).send("key not found");
        }
        toBeChanged.every((update) => {
            product[update] = req.body[update];
        });
        await product.save();
        res.status(200).send(product);
    } catch (e) {
        res.status(405).send();
    }
});

router.delete("/api/product", async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: mongoose.Types.ObjectId(req.body._id),
        });
        if (!product) {
            res.status(405).send("product not found");
        }
        await product.remove();
        res.status(200).send(product);
    } catch (e) {
        console.log(e);
        res.status(405).send();
    }
});

module.exports = router;