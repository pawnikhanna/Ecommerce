var {to} = require('await-to-js');
const bcrypt = require('bcrypt');

const db = require('../src/lib/database/mysql/connect');

async function getCustomerById(customer_id){
    let [err, result] = await to( db.customerModel.findAll({
        where: {
            customer_id: customer_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            return null, result;
        } else {
            return `No customer with id: ${customer_id}`, null;
        }
    } else {
        return err, null;
    }
}

async function updateNumber(customer_id, phone_number){
    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customer_id
        }
    }) );
    let customer = result[0];
    if(customer == null){
        return `No customer with id: ${customer_id}`, null;
    } 

    [err, result] = await to ( db.customerModel.findAll({
        where: {
            phone_number: phone_number
        }
    }) )
    customer = result[0];
    if(customer){
        return `This phone number already registered`, null;
    }

    [err, result] = await to(
        db.customerModel.update({ phone_number: phone_number}, 
            { 
                where: {
                customer_id: customer_id
        } })
    );
    if(!err){
        return result, null;
    } else {
        return err, null;
    }
}

async function updateCreditCard(customer_id, card_number){
    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customer_id
        }
    }) );
    let customer = result[0];
    if(customer == null){
        return `No customer with id: ${customer_id}`, null;
    } 

    [err, result] = await to(
        db.customerModel.update({ card_number: card_number}, 
            { 
                where: {
                customer_id: customer_id
        } })
    );
    if(!err){
        return null, "Card details updated";
    } else {
        return err, null;
    }
}

async function updateAddress(customer_id, address){
    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customer_id
        }
    }) );
    let customer = result[0];
    if(customer == null){
        return `No customer with id: ${customer_id}`, null;
    } 

    [err, result] = await to(
        db.customerModel.update({ address: address }, 
            { 
                where: {
                customer_id: customer_id
        } })
    );
    if(!err){
        return null, "Address updated";
    } else {
        return err, null;
    }
}

module.exports = {
    getCustomerById, updateNumber, updateCreditCard, updateAddress
}