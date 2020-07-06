const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("./product");
const validator = require("validator");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("enter correct email");
            }
        },
    },
    phone: {
        type: Number,
        required: true,
        length: 10,
    },
    address: [{
        line1: {
            type: String,
            required: false,
        },
        line2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
    },],
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    age: {
        type: Number,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product,
        },
        quantity: {
            type: Number,
        },
    },],
    orders: {
        type: Array
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    },],
});

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error("unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },
        process.env.TOKEN_STRING
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("users", UserSchema);

module.exports = User;