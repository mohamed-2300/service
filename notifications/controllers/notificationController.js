const Notification = require('../models/Notification');

const getNotificationsForUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

const markAsRead = async (req, res) => {
  const notificationId = req.params.id;

  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) return res.status(404).json({ message: 'Notification introuvable.' });

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

module.exports = {
  getNotificationsForUser,
  markAsRead
};
