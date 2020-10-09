const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../mysql/db');

const categoryModel = connection.define( 'categories', {
    category_id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = categoryModel;