const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validation = require('../src/joi_validations/validations');
const customer_service = require('../services/customer');
const db = require('../src/lib/database/mysql/connect');

let salt = process.env.salt;
const generateToken = (password, salt) => {

    let token = jwt.sign(password, salt);
    return token;
}

const passwordHash = async (password) => {
    const saltRounds = 12;
    const [err, passwordHash] = await to(bcrypt.hash(password, saltRounds));
    if (err) {
        return res.send({"msg": "Error while generating password hash"}); 
    }
    return passwordHash;
};

exports.getCustomerById = async(req, res) => {
    let category_id = req.params.id;
    let [err, result] = await to(customer_service.getCustomerById(category_id))
    if (err){
        return res.json({ data: null, "Error": err});
    } 

    let error, cust = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: cust, error: null});
}

exports.signup = async(req, res) => {
    const {email, name, password, phone_number} = req.body;

    let validate = await validation.signup.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload" });
    }
    
    [err, result] = await to ( db.customerModel.findAll({
        where: {
            phone_number: phone_number
        }
    }) )
    customer = result[0];
    if(customer){
        return res.status(400).send({ data: null, error: `This phone number already registered` });
    }

    let encryptedPassword = await  passwordHash(password);

    [err, result] = await to(
        db.customerModel.create({
            email, name, encryptedPassword, phone_number
    }) )
    if(!err){
        return res.json({
            "msg": "Sign up successful"
        });
    } else{
        return res.json({"data":null, "error": err})
    }
}

exports.login = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let validate = await validation.login.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: error.message });
    }

    let [err, result] = await to(db.customerModel.findAll({
        where:{
            email: email
        }
    }) )
    let customer = result[0];
    if(customer == null){
        return res.json({
            data: null, error: "Invalid email"
        });
    }
    
    let [error, isValid] = await to(
        bcrypt.compare(password, customer.encryptedPassword )
    );
    if(!isValid){
        return res.status(400).json({ data: null, error: "Incorrect Password"});
    }
    else{
        let token = generateToken(customer.encryptedPassword, salt);
        return res.json({
            data: "Login successful",
            token: token
        }) 
    }
}

exports.updateNumber = async(req, res) => {
    let customer_id = req.params.id;
    let phone_number = req.body.phone_number;

    let validate = await validation.phone_number.validate({phone_number});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(customer_service.updateNumber(customer_id, phone_number))
    if(err)
        return res.json({ data: null, error: err});

    return res.json({ data: "Phone number updated", error: null});
}

exports.updateCreditCard = async(req, res) => {
    let customer_id = req.params.id;
    let card_number = req.body.card_number;

    let validate = await validation.card_number.validate({card_number});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(customer_service.updateCreditCard(customer_id, card_number))
    if(err)
        return res.json({ data: null, error: err});

    let error, cust = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: cust, error: null});
}

exports.updateAddress = async(req, res) => {
    let customer_id = req.params.id;
    let address = req.body.address;

    let validate = await validation.address.validate({address});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(customer_service.updateAddress(customer_id, address))
    if(err)
        return res.json({ data: null, error: err});

    let error, cust = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: cust, error: null});
}