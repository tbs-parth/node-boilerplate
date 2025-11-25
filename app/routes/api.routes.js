const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const checkValidationHook = require('../../hooks/checkValidationHook');

// Validations
const AuthValidation = require('../validation/AuthValidation');

// Controllers
const AuthController = require('../controller/api/AuthController');
const UserController = require('../controller/api/UserController');
const BaseController = require('../controller/BaseController');

router.post('/test-file-upload', BaseController.testFileUpload);

router.post('/login', checkValidationHook(AuthValidation.login), auditMiddleware, AuthController.login);
router.post('/signup', auditMiddleware, AuthController.register);

const PrivateRoutes = router.use(authMiddleware, auditMiddleware);
PrivateRoutes.get('/logout', AuthController.logout);
PrivateRoutes.post('/user/list', UserController.index);
PrivateRoutes.post('/user/update', UserController.update);

module.exports = router;
