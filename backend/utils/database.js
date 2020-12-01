const Sequelize = require('sequelize');
const keys=require('../config/keys');
const sequelize = new Sequelize(keys.database,keys.username, keys.password, {
    dialect: 'mysql',
    host: keys.hosts
});

module.exports = sequelize;