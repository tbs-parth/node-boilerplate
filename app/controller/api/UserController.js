const { successResponse } = require('../../../hooks/responseHook');
const logger = require('../../config/logger');
const { User } = require('../../models');

class UserController {
    async index(req, res) {
        const users = await User.findAll();
        return successResponse(res, 'Fetch users list.', users);
    }

    async update(req, res) {
        try {
            const id = 'e1d36ab6-9a43-4944-845f-16489c78de78';
            const user = await User.findByPk(id);
            await user.update({ email: 'tbs.fule@gmail.com' }, { userId: req.user?.id || null });
            logger.info(`✔ User updated: ${user.id}`);
            return successResponse(res, 'User updated successfully', user);
        } catch (error) {}
    }
}

module.exports = new UserController();
