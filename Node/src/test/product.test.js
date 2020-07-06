const request = require("supertest");
const Product = require("../modles/product");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../modles/user");

const userId = new mongoose.Types.ObjectId();
const productId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userId,
    name: "harsh",
    email: "harsh@gmail.com",
    password: "Harsh@1234",
    phone: 1234567890,
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.TOKEN_STRING),
    }, ],
};

const productOne = {
    _id: productId,
    name: "Apple",
    category: "Fruits",
    inStock: true,
    quantity: 100,
    price: 12,
    brand: "Fresh Fruits",
};

beforeEach(async() => {
    await User.deleteMany({});
    await Product.deleteMany();
    const product = new Product(productOne);
    const user = new User(userOne);
    await user.save();
    await product.save();
});

test("get product", async() => {
    await request(app)
        .get("/api/product")
        .set("Authorization", userOne.tokens[0].token)
        .send()
        .expect(200);
});

test("create a product", async() => {
    await request(app)
        .post("/api/product")
        .set("Authorization", userOne.tokens[0].token)
        .send({
            name: "Apple",
            category: "Fruits",
            inStock: true,
            quantity: 50,
            price: 120,
            brand: "Fresh Fruits",
        })
        .expect(201);
});

test("update a product", async() => {
    await request(app)
        .patch("/api/product")
        .set("Authorization", userOne.tokens[0].token)
        .send({
            _id: productId,
            name: "Pineapple",
        })
        .expect(200);
});

test("delete a product", async() => {
    await request(app)
        .delete("/api/product")
        .set("Authorization", userOne.tokens[0].token)
        .send({
            _id: productOne._id,
        })
        .expect(200);
});