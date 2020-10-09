var express = require('express');
var app = express.Router();

const CustomerController = require('../controllers/customer');
const auth = require("../middleware/auth");

app.get("/:id", CustomerController.getCustomerById);

app.post('/signup', CustomerController.signup);

app.post('/login', CustomerController.login);

app.put("/:id/update", auth, CustomerController.updateNumber);

app.put("/:id/creditcard", auth, CustomerController.updateCreditCard);

app.put("/:id/address", auth, CustomerController.updateAddress);

module.exports = app;