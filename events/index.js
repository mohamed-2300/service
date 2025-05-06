const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const startRabbitMQ = require('./rabbitmq/publisher');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connexion base de données
connectDB();

// Routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/events', eventRoutes);

// db
connectDB();

// RabbitMQ
startRabbitMQ();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Event service en écoute sur le port ${PORT}`));
