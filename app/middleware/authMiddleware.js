const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB (optional, if you want full user object)
        const user = await User.findByPk(payload.userId);
        if (!user) return res.status(401).json({ error: 'Invalid token' });

        req.user = user; // attach user to request
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
