const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Comment= sequelize.define('Comment', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    text:
    {
        type:Sequelize.STRING,
        allowNull:false
    }

});

module.exports=Comment;