const Sequelize = require('sequelize');
const {to} = require('await-to-js');
const connection = require('../mysql/db');

let customerModel = require('../models/customerModel');

let categoryModel = require('../models/categoryModel');

let productModel = require('../models/productModel');

let cartModel = require('../models/cartModel');

let orderModel = require('../models/orderModel');

let reviewModel = require('../models/reviewModel')

const connect = async ()=>{
    await connection.sync();
    let [err, result] = await to(connection.sync({ alter: false}));

    if(err)
        logger.error("Error in connecting to Database !");
    else
        logger.info('Connected to Database');
};

//connection.sync({ force: true })

module.exports = {
    connect, cartModel, customerModel, categoryModel,
    orderModel, productModel, reviewModel
}