const Registration = require("../models/Registration");

const registerToEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.userId;

  try {
    const existing = await Registration.findOne({ userId, eventId });
    if (existing)
      return res.status(400).json({ message: "Déjà inscrit à cet événement." });

    const registration = new Registration({ userId, eventId });
    await registration.save();
    const { publishMessage } = require("../rabbitmq/publisher");

    publishMessage("user_registered", {
      userId: req.user.userId,
      eventTitle: "TechConf 2025", // ou récupéré dynamiquement selon eventId
    });

    res.status(201).json({ message: "Inscription réussie.", registration });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error });
  }
};

const getUserRegistrations = async (req, res) => {
  const userId = req.user.userId;
  try {
    const registrations = await Registration.find({ userId });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error });
  }
};

module.exports = {
  registerToEvent,
  getUserRegistrations,
};
