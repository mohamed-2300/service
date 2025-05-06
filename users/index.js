const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes utilisateur
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`User service en écoute sur le port ${PORT}`);
});


const startConsumer = require('./rabbitmq/consumer');
startConsumer();