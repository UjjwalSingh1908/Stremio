const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const VerificationToken = sequelize.define('VerificationToken', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    token: Sequelize.STRING

});

module.exports=VerificationToken;