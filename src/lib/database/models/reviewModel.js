const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../mysql/db');
const model = require('../mysql/connect');

const reviewModel = connection.define ( 'review',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    review:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: model.productModel,
            key: 'product_id'
        }
    }
});

module.exports = reviewModel;