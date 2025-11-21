const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');

// Controllers
const AuthController = require('../controller/api/AuthController');
const UserController = require('../controller/api/UserController');

router.post('/login', auditMiddleware, AuthController.login);
router.post('/signup', auditMiddleware, AuthController.register);

const PrivateRoutes = router.use(authMiddleware, auditMiddleware);
PrivateRoutes.get('/logout', AuthController.logout);
PrivateRoutes.post('/user/list', UserController.index);
PrivateRoutes.post('/user/update', UserController.update);

module.exports = router;
