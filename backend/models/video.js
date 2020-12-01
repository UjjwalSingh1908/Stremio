const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const video=sequelize.define('video',{
    id:{
        type:Sequelize.INTEGER(11),
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
    },
    viewsCount:
    {
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    likesCount:
    {
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    dislikesCount:
    {
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    commentsCount:
    {
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    subscribersCount:
    {
        type:Sequelize.INTEGER,
        defaultValue:0
    }
    // thumbnail:
    // {
    //     type:Sequelize.STRING
    // }

});

module.exports=video;