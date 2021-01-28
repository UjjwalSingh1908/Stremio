const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const viewstory= sequelize.define('viewstory', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }

});

module.exports=viewstory;