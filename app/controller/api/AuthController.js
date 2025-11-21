const { successResponse, errorResponse } = require('../../../hooks/responseHook');
const logger = require('../../config/logger');
const AuthService = require('../../services/AuthService');

class AuthController {
    async login(req, res) {
        try {
            const { email, password, device } = req.body;
            const ip = req.ip;

            const loginData = await AuthService.login(email, password, device || 'web', ip);
            logger.info(`✔ Login successful: ${JSON.stringify(loginData)}`);

            return successResponse(res, 'Login successful', loginData);
        } catch (err) {
            logger.error(`✖ AuthController.login error: ${JSON.stringify(err.message)}`);
            return errorResponse(res, err.message || 'Login failed', 500, err);
        }
    }

    async register(req, res) {
        try {
            const requestData = req.body;

            const registerUser = await AuthService.register(requestData);
            logger.info(`✔ User register successful`);
            return successResponse(res, 'User register successful', registerUser);
        } catch (err) {
            logger.error(`✖ AuthController.registration error: ${err}`);
            return errorResponse(res, err.message || 'Registration failed', 500, err);
        }
    }

    async logout(req, res) {
        return true;
    }
}

module.exports = new AuthController();
