const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const video=sequelize.define('video',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    description:
    {
        type:Sequelize.STRING
    },
    videourl:
    {
        type:Sequelize.STRING,
        allowNull:false
    }

});

module.exports=video;