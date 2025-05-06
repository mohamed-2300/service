const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connecté au service users');
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error);
    process.exit(1); // Stoppe l'application si échec de connexion
  }
};

module.exports = connectDB;