'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('app_tokens', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'users', // 👈 name of table (NOT model name)
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            access_token: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            refresh_token: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            expires_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            refresh_expires_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            device: {
                type: Sequelize.STRING,
                allowNull: true
            },
            ip_address: {
                type: Sequelize.STRING,
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('app_tokens');
    }
};
