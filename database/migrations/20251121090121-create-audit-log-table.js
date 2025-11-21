// migrations/xxxx-create-audit-log.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('audit_logs', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            table_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            record_id: {
                type: Sequelize.UUID,
                allowNull: false
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: true
            },
            action: {
                type: Sequelize.STRING, // created | updated | deleted
                allowNull: false
            },
            old_values: {
                type: Sequelize.JSON,
                allowNull: true
            },
            new_values: {
                type: Sequelize.JSON,
                allowNull: true
            },
            metadata: {
                type: Sequelize.JSON,
                allowNull: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('audit_logs');
    }
};
