const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getNotificationsForUser,
  markAsRead
} = require('../controllers/notificationController');

router.get('/', auth, getNotificationsForUser);
router.patch('/:id/read', auth, markAsRead);

module.exports = router;
