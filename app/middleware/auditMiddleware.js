const namespace = require('../utils/cls');

const auditMiddleware = (req, res, next) => {
    namespace.run(() => {
        namespace.set('userId', req.user?.id || null);
        namespace.set('ip', req.ip);
        namespace.set('userAgent', req.headers['user-agent']);
        namespace.set('requestId', Date.now().toString()); // optional

        next();
    });
};

module.exports = auditMiddleware;
