const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { registerToEvent, getUserRegistrations } = require('../controllers/registrationController');

router.post('/', auth, registerToEvent);
router.get('/', auth, getUserRegistrations);

module.exports = router;