const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Like= sequelize.define('Like', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    like:
    {
        type:Sequelize.INTEGER,
        allowNull:false
    }

});

module.exports=Like;