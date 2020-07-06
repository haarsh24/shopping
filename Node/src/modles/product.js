const mongoose = require("mongoose");

"name", "category", "inStock", "quantity", "price", "brand";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    inStock: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
    },
});

productSchema.methods.getArray = function(update) {
    let toBeUpdated = [];
    if (update !== "_id") {
        toBeUpdated.concat(update);
    }
    return toBeUpdated;
};

const Product = mongoose.model("products", productSchema);

module.exports = Product;