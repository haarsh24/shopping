const request = require("supertest");
const User = require("../modles/user");
const app = require("../app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Product = require("../modles/product")

const userId = mongoose.Types.ObjectId();

const userOne = {
    _id: userId,
    name: "harsh",
    email: "harsh@gmail.com",
    password: "Harsh@1234",
    phone: 1234567890,
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.TOKEN_STRING),
    }, ]
}
;


const productOne = {
        "_id" : mongoose.Types.ObjectId("5ed62290c9f9010f64528c07"),
        "name" : "Apple",
        "category" : "Fruits",
        "inStock" : "yes",
        "quantity" : 50,
        "price" : 120,
        "brand" : "Fresh Fruits",
        "expiry" : "12/10/2020"
}


beforeEach(async() => {
    await User.deleteMany();
    await Product.deleteMany();
    const user = new User(userOne);
    const product = new Product(productOne)
    await user.save();
    await product.save()
});

test("get cart", async() => {
    await request(app)
        .get("/api/cart")
        .set("Authorization", userOne.tokens[0].token)
        .send()
        .expect(200);
});

test("create cart", async() => {
    await Product.deleteMany()
    await request(app)
        .post("/api/cart")
        .set("Authorization", userOne.tokens[0].token)
        .send({
			"productId" : "5ed62290c9f9010f64528c07",
			"quantity" : 10
	})
        .expect(201);
});

test("update cart", async() => {
    await request(app)
        .patch("/api/cart")
        .set("Authorization", userOne.tokens[0].token)
        .send({
			"productId" : "5ed62290c9f9010f64528c07",
			"quantity" : 10
	})
        .expect(201);
});

test("delete a cart", async() => {
    await request(app)
        .delete("/api/cart")
        .set("Authorization", userOne.tokens[0].token)
        .send()
        .expect(200);
});