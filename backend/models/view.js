const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const view= sequelize.define('view', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }

});

module.exports=view;