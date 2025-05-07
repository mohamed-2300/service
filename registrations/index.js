const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { connectRabbitMQ } = require('./rabbitmq/publisher');


const registrationRoutes = require('./routes/registrationRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/registrations', registrationRoutes);

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Registration service lancé sur le port ${PORT}`);
  });
};

startServer();
