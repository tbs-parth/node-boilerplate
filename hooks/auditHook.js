const namespace = require('../app/utils/cls');

let AuditLogModel = null;

function initAuditHook(AuditLog) {
    AuditLogModel = AuditLog;
}

async function createAuditLog(instance, action) {
    try {
        if (!AuditLogModel) {
            console.error('AuditHook Error: AuditLogModel not initialized');
            return;
        }

        const userId = namespace.get('userId');
        const ip = namespace.get('ip');
        const userAgent = namespace.get('userAgent');
        const requestId = namespace.get('requestId');

        const tableName = instance.constructor.tableName;
        const recordId = instance.id;

        let oldValues = null;
        let newValues = null;

        if (action === 'created') newValues = instance.toJSON();

        if (action === 'deleted') oldValues = instance.toJSON();

        if (action === 'updated') {
            const changed = instance.changed() || [];
            if (changed.length === 0) return;

            oldValues = {};
            newValues = {};

            changed.forEach((field) => {
                oldValues[field] = instance._previousDataValues[field];
                newValues[field] = instance.dataValues[field];
            });
        }

        await AuditLogModel.create({
            table_name: tableName,
            record_id: recordId,
            user_id: userId,
            action,
            old_values: oldValues,
            new_values: newValues,
            metadata: {
                ip_address: ip,
                user_agent: userAgent,
                request_id: requestId
            }
        });
    } catch (err) {
        console.error('AuditHook Error:', err.message);
    }
}

module.exports = { initAuditHook, createAuditLog };
