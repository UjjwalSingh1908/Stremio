const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Story= sequelize.define('Story', {
    id: 
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    storyurl:
    {
        type:Sequelize.STRING,
        allownull:false
    },
    expire:
    {
        type:Sequelize.STRING,
        //allowNull:false
    }

});

module.exports=Story;