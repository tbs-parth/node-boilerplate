module.exports = (sequelize, DataTypes) => {
    const AuditLog = sequelize.define(
        'AuditLog',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            table_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            record_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: true
            },
            action: {
                type: DataTypes.STRING,
                allowNull: false
            },
            old_values: {
                type: DataTypes.JSON,
                defaultValue: null
            },
            new_values: {
                type: DataTypes.JSON,
                defaultValue: null
            },
            metadata: {
                type: DataTypes.JSON,
                defaultValue: null
            }
        },
        {
            tableName: 'audit_logs',
            underscored: true,
            timestamps: true
        }
    );

    return AuditLog;
};
