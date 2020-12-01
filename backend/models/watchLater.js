const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const watchList= sequelize.define('watchList', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }

});

module.exports=watchList;