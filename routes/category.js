var express = require('express');
var app = express.Router();

const CategoryControllers = require('../controllers/category');

app.get("/", CategoryControllers.getCategories );

app.get("/:id", CategoryControllers.getCategoriesById );

app.get("/inProduct/:product_id", CategoryControllers.getCategoriesInProduct );

module.exports = app;