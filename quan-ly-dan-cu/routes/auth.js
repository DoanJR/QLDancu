const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', auth, authController.getCurrentUser);
router.post('/logout', auth, authController.logout);
router.get('/users', auth, authController.getAllUsers);
router.put('/users/:user_id/role', auth, authController.updateUserRole);

module.exports = router;
