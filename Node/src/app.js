const express = require("express");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const OrderRouter = require("./routes/order")
require("./db/mongoose");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(OrderRouter);

module.exports = app;