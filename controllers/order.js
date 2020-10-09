const {to} = require('await-to-js');
const Sequelize = require('sequelize');

const validation = require('../src/joi_validations/validations');
const order_service = require('../services/order');

exports.placeOrder = async(req, res) => {
    let address = req.body.address;
    let validate = await validation.address.validate({address});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(order_service.placeOrder(req.body))
    if(err)
        res.json({ data: null, error: err});
    return res.json({ message:"Order placed successfully"});
}

exports.buyNow = async(req, res) => {
    let [err, result] = await to(order_service.buyNow(req.body));
    if(err)
        res.json({ data: null, error: err});
    return res.json(result);
}

exports.getOrderById = async(req, res) => {
    let order_id = req.params.id
    let [err, result] = await to(order_service.getOrderById(order_id))
    if (err){
      return res.json({"Data":null, "Error": err});
    }
    else{
      return res.json({ result });
    }
}

exports.getOrdersInCustomer = async(req, res) => {
    const customer_id = req.params.customer_id;
    [err, result] = await to(order_service.getOrdersInCustomer(customer_id))
    if(err){
        return res.json({data: null, error: err});
    } else{
        return res.json({ data: result, error: null});
    }
}

exports.getShortDetail = async(req, res) => {
    let order_id = req.params.id;
    let [err, result] = await to(order_service.getShortDetail(order_id))
    if (err){
      return res.json({"Data":null, "Error": err});
    }
    else{
      return res.json({ result });
    }
}
