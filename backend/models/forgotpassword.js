const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const forgotPassword = sequelize.define('forgotPassword ', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    token: Sequelize.STRING

});

module.exports=forgotPassword ;