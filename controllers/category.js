const {to} = require('await-to-js');
const Sequelize = require('sequelize');

const category_services = require('../services/category');

exports.getCategories = async(req, res) => {
    let [err, result] = await to(category_services.getCategories())
    if(err)
        return res.json({ data: null, error: err});

    let error, category = result;
    if(error)
        return res.json({ data: null, error});
    return res.json({ data: category, error: null});
};

exports.getCategoriesById = async(req, res) => {
  let category_id = req.params.id;
  let [err, result] = await to(category_services.getCategoriesById(category_id))
  if(err)
    return res.json({ data: null, error: err});

  let error, category = result;
  if(error)
      return res.json({ data: null, error});
  return res.json({ data: category, error: null});
}

exports.getCategoriesInProduct = async(req, res) => {
  let product_id = req.params.product_id;
  let [err, result] = await to(category_services.getCategoriesInProduct(product_id))
  if(err)
    return res.json({ data: null, error: err});

  let error, category = result;
  if(error)
    return res.json({ data: null, error});
  return res.json({ data: category, error: null});
}