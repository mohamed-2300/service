
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);

// Route protégée
router.get('/:id', auth, userController.getUserById);

module.exports = router;