const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../mysql/db');
const model = require('../mysql/connect');

const cartModel = connection.define( 'cart', {
    item_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: model.customerModel,
            key: 'customer_id'
        }
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: model.productModel,
            key: 'name'
        }
    },
    attributes:{
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: model.productModel,
            key: 'product_id'
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = cartModel;