const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Reply= sequelize.define('Reply', {
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
    },
    particular_user: //parent user
    {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    particular_user_id: //replying user
    {
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports=Reply;