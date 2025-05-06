const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middlewares/auth');

// Toutes les routes sont protégées
router.post('/', auth, eventController.createEvent);
router.get('/', auth, eventController.getAllEvents);
router.get('/:id', auth, eventController.getEventById);
router.put('/:id', auth, eventController.updateEvent);

module.exports = router;
