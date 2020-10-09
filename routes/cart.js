var express = require('express');
var app = express.Router();

const CartController = require('../controllers/cart');
const auth = require("../middleware/auth");

app.get("/:id", auth, CartController.getProductsById);

app.post("/add", auth, CartController.addProducts);

app.put("/update/:item_id", auth, CartController.updateProduct);

app.delete("/empty", auth, CartController.deleteProducts);

app.get("/totalAmount/:id", auth, CartController.getTotalAmount);

app.delete("/removeProduct/:id", auth, CartController.deleteOneProduct);

module.exports = app;
