const {to} = require('await-to-js');

const Sequelize = require('sequelize');
const db = require('../src/lib/database/mysql/connect');
const cart_service = require('../services/cart');

exports.getProductsById = async(req, res) => {
    let customer_id = req.params.id;
    let [err, result] = await to(cart_service.getProductsById(customer_id))
    if(!err) {
        return res.json({ result });
    } else {
        res.json({ data: null, "error": err});
    }
};

exports.addProducts = async(req,res) => {
    let product = req.body;

    let [err, result] = await to(cart_service.addProducts(product));
    if (err) {
        return res.json({ error: err.message });
    } else {
        return res.json({ message: "Product added successfully" })
    }    
}

exports.updateProduct = async(req, res) => {
    const item_id = req.params.item_id;
    const quantity = req.body.quantity;

    let [err, result] = await to(cart_service.updateProduct(item_id, quantity))
    if (err) {
        return res.json({ error:err });
    } else {
        return res.json({ result })
    }
}

exports.deleteProducts = async(req, res) => {
    const customer_id = req.body.customer_id;
    let [err, result] = await to(cart_service.deleteProducts(customer_id))
    if (err){
        return res.json({"Data":null, "Error": err});
    } 
    if(!result){
        return res.json({data: null, error: "No products in cart"});
    }
    return res.json({ message: "Items deleted Successfully" })
}

exports.getTotalAmount = async(req, res) => {
    const customer_id = req.params.id;

    let [err, result] = await to(cart_service.getTotalAmount(customer_id))
    if (err){
        return res.json({"Data":null, "Error": err});
    } 
    if(!result){
        return res.json({"Data": null, "Error": result[0]});
    }
    return res.json({ result })
}

exports.deleteOneProduct = async(req, res) => {
    const product_id = req.params.id;

    let [err, result] = await to(cart_service.deleteOneProduct(product_id))
    if(err)
        return res.json({data: null, error: err});

    return res.json({ result});
}