const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../app");
const User = require("../modles/user");

const userId = new mongoose.Types.ObjectId();

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

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
});

test("Signup User", async() => {
    await request(app)
        .post("/api/user")
        .send({
            name: "test",
            email: "test@test.com",
            password: "Test@123",
            phone: 1234567890,
        })
        .expect(201);
});

test("login User", async() => {
    await request(app)
        .post("/api/login")
        .send({
            email: userOne.email,
            password: userOne.password,
        })
        .expect(200);
});

test("login fail", async() => {
    await request(app)
        .post("/api/login")
        .send({
            email: userOne.email,
            password: "Test",
        })
        .expect(400);
});

test("read user details", async() => {
    await request(app)
        .get("/api/user")
        .set("Authorization", userOne.tokens[0].token)
        .send()
        .expect(200);
});

test("logout", async() => {
    await request(app)
        .post("/api/logout")
        .set("Authorization", userOne.tokens[0].token)
        .send()
        .expect(200);
});

test("logout all", async() => {
    await request(app)
        .post("/api/logout/all")
        .set("Authorization", userOne.tokens[0].token)
        .send()
        .expect(200);
});