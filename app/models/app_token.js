module.exports = (sequelize, DataTypes) => {
    const AppToken = sequelize.define(
        'AppToken',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: true
            },
            access_token: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            refresh_expires_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            device: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ip_address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            metadata: {
                type: DataTypes.JSON,
                allowNull: true
            }
        },
        {
            tableName: 'app_tokens',
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return AppToken;
};
