var {to} = require('await-to-js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../src/lib/database/mysql/connect');
const cache = require('../src/lib/cache/redis');

async function getProducts(){
    let [err, result] = await to( db.productModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    }));
    if (err){
        return err, null;
    }
    let Products = JSON.stringify(result);
    [err, result] = await to(cache.setValue("Products", Products));
    if (err){
      return "Cannot set value", null;
    } else {
      result = JSON.parse(Products);
      return null, result;
    }
}

async function getProductsById(product_id){
    let [err, result] = await to( db.productModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}  ,
        where: {
          product_id: product_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
          let Product = JSON.stringify(result);
          [err, result] = await to(cache.setValue("Products_byId", Product));
          if (err){
            return err, null;
          } else {
            result = JSON.parse(Product);
            return null, result;
          }
        } else {
            return `No product with id: ${product_id}`, null;
        }
    } else {
        return err, null;
    }
}

async function searchProducts(category){
    let [err, result] = await to( db.productModel.findAll({
        where: {
            name: {
                [Op.like]: '%' + category + '%'
            }
          }
    }) );
    if(!err) {
        if(result && result.length > 0) {
              return null, result;
        } else {
            return `No product with name: ${category}`, null;
        }
    } else {
        return err, null
    }
}

async function getProductsInCategory(category_id){
    let [err, result] = await to( db.productModel.findAll({
        attributes: ['name'],
        group: ['name'],
        where: {
            category_id: category_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            const count = result.length
            return count, result;
        } else {
            return `No product of category with category_id:${category_id}`, null;
        }
    } else {
        return err, null
    }
}

async function getDetailsById(product_id){
    let [err, result] = await to( db.productModel.findAll({
        attributes: ['name', 'description', 'price'],
        where: {
          product_id: product_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
          return null, result;
        } else {
            return `No product with id: ${product_id}`, null;
        }
    } else {
        return err, null
    }
}

async function getReviews(product_id){
    let [err, result] = await to( db.reviewModel.findAll({
        attributes: ['review'],
        where: {
          product_id: product_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            return null, result;
        } else {
            return `No review of product with id: ${product_id}`, null;
        }
    } else {
        return err, null
    }
}

async function addReviews(product_id, review){
    let [err, result] = await to( db.orderModel.findAll({
        where:{
          product_id: product_id
        }
    }) );
  
    if(result.length != 0){
        [err, result] = await to( db.reviewModel.create({
          name: review.name,
          review: review.review,
          rating: review.rating,
          product_id: product_id
        }) );
        if (err){
            return err, null;
        }
        else{
            return "Review added successfully", null;
        }
    } 
}

module.exports ={
    getProducts, getProductsById, searchProducts, getDetailsById,
    getProductsInCategory, addReviews, getReviews
}