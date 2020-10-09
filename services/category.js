var {to} = require('await-to-js');
const Sequelize = require('sequelize');

const db = require('../src/lib/database/mysql/connect');
const cache = require('../src/lib/cache/redis');

async function getCategories() {
    let [err, result] = await to(db.categoryModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'description']}
    }));
    if(err)
        return err, null;
    else if(result.length == 0)
        return "No categories present", null;

    let Categories = JSON.stringify(result);
    [err, result] = await to(cache.setValue("Categories", Categories));
    if (err){
      return err, null;
    } else {
      result = JSON.parse(Categories);
      return null, result;
    }
}

async function getCategoriesById(category_id) {
    let [err, result] = await to( db.categoryModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'description']}  ,
        where: {
            category_id: category_id
          }
    }) );
    if(!err) {
      if(result && result.length > 0) {
        let Category = JSON.stringify(result);
        [err, result] = await to(cache.setValue("Categories_byId", Category));
        if (err){
          return err, null;
        } else {
          result = JSON.parse(Category);
          return null, result;
        }
      } else{
          return `No category with id:${category_id}`, null;
      }
    } else {
        return err, null;
    }
}

async function getCategoriesInProduct(product_id) {
    let [err, result] = await to( db.productModel.findAll({
        attributes:['category_id'],
        where:{
          product_id: product_id
        }
    }));
    
    let category_id = result[0]['category_id'];
    [err, result] = await to( db.categoryModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}  ,
        where: {
          category_id: category_id
        }
    }) );
    if(!err) {
      if(result && result.length > 0) {
          return null, result;
      } else {
          return `No category of product with product_id: ${product_id}`, null;
      }
    } else {
      return null, result;
    }
}

module.exports = {
    getCategories, getCategoriesById, getCategoriesInProduct
}