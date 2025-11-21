const Sequelize = require('sequelize');
const config = require('./sequelize');
const namespace = require('../utils/cls');

Sequelize.useCLS(namespace);

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging
});

module.exports = sequelize;
