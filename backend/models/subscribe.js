const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Subscribe= sequelize.define('Subscribe', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    subscriber:
    {
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports=Subscribe;