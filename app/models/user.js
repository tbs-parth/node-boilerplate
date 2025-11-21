module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_type: {
                type: DataTypes.ENUM('SUPER_ADMIN', 'ORGANIZATION_ADMIN', 'USER'),
                allowNull: false,
                defaultValue: 'USER'
            },
            verified_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
        },
        {
            tableName: 'users',
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return User;
};
