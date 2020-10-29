const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    email:
    {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:
    {
        type: Sequelize.STRING,
        allowNull:true
    },
    isverified:
    {
        type:Sequelize.STRING,
        defaultValue:"false"
    }

});

module.exports=User;