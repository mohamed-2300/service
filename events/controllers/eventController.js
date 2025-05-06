const Event = require('../models/Event');
const { publishMessage } = require('../rabbitmq/publisher');

// Créer un événement
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location, capacity } = req.body;

    const existing = await Event.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Nom déjà utilisé' });

    const event = new Event({ name, description, date, location, capacity });
    await event.save();

    // Notification RabbitMQ
    publishMessage('newEvent', { eventId: event._id, name, date });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Liste des événements
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Détails d’un événement
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement introuvable' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Mettre à jour un événement
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Événement introuvable' });

    // Notification RabbitMQ
    publishMessage('event_supprimes', { eventId: updated._id, ...req.body });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
