const { createAuditLog, initAuditHook } = require('../../hooks/auditHook');
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);
const AppToken = require('./app_token')(sequelize, DataTypes);
const AuditLog = require('./audit_log')(sequelize, DataTypes);

const models = { User, AppToken, AuditLog };

// Setup associations if any
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

initAuditHook(AuditLog);

for (const modelName of Object.keys(models)) {
    const model = models[modelName];
    if (modelName === 'AuditLog') continue;

    model.addHook('afterCreate', (instance) => createAuditLog(instance, 'created'));
    model.addHook('beforeUpdate', (instance) => createAuditLog(instance, 'updated'));
    model.addHook('beforeDestroy', (instance) => createAuditLog(instance, 'deleted'));

    console.log(`✓ Audit hooks applied to: ${modelName}`);
}

const db = { ...models, sequelize };
module.exports = db;
