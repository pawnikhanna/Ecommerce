var express = require('express');
var app = express.Router();

const auth = require("../middleware/auth");
const ProductControllers = require('../controllers/product');

app.get("/", ProductControllers.getProducts);

app.get("/:id", ProductControllers.getProductsById);

app.get("/search/:name", ProductControllers.searchProducts);

app.get("/inCategory/:category_id", ProductControllers.getProductsInCategory);

app.get("/:id/detail", ProductControllers.getDetailsById);

app.get("/:id/reviews", ProductControllers.getReviews);

app.post("/:id/reviews", auth, ProductControllers.addReviews);

module.exports = app;