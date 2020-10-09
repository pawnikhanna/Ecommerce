var express = require('express');
var app = express.Router();

const auth = require("../middleware/auth");
const OrdersControllers = require('../controllers/order')

app.post("/", auth, OrdersControllers.placeOrder);

app.post("/buyNow", auth, OrdersControllers.buyNow);

app.get("/:id", auth, OrdersControllers.getOrderById);

app.get("/inCustomer/:customer_id",auth, OrdersControllers.getOrdersInCustomer);

app.get("/shortDetail/:id",auth, OrdersControllers.getShortDetail);

module.exports = app;