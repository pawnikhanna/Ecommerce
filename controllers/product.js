const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const validation = require('../src/joi_validations/validations');
const product_service = require('../services/product');

exports.getProducts = async(req, res) => {
    let [err, result] = await to(product_service.getProducts())
    if(err)
        return res.json({ data: null, error: err});

    let error, prod = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: prod, error: null});
}

exports.getProductsById = async(req, res) => {
    let [err, result] = await to(product_service.getProductsById(req.params.id))
    if(err)
        return res.json({ data: null, error: err});
    
    let error, prod = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: prod, error: null});
}

exports.searchProducts = async(req, res) => {
    const category = req.params.name;
    let [err, result] = await to(product_service.searchProducts(category))
    if(err)
        return res.json({ data: null, error: err});
    
    let error, prod = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: prod, error: null});
}

exports.getProductsInCategory = async(req, res) => {
    let [err, result] = await to(product_service.getProductsInCategory(req.params.category_id))
    if(err)
        return res.json({ data: null, error: err});
    
    let error, prod = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: prod, error: null});
}

exports.getDetailsById = async(req, res) => {
    let [err, result] = await to(product_service.getDetailsById(req.params.id))
    if(err)
        return res.json({ data: null, error: err});
    
    let error, prod = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: prod, error: null});
}

exports.getReviews = async(req, res) => {
    let [err, result] = await to(product_service.getReviews(req.params.id))
    if(err)
        return res.json({ data: null, error: err});
    
    let error, prod = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: prod, error: null});
}

exports.addReviews = async(req, res) => {
    let validate = await validation.add_review.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload" });
    }

    let [err, result] = await to(product_service.addReviews(req.params.id, req.body))
    if(err)
        return res.json({ data: null, error: err});
    
    let error, prod = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: prod, error: null});
}