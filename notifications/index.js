const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const connectRabbitMQ = require('./rabbitmq/consumer');

const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5004;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Notification service lancé sur le port ${PORT}`);
  });
};

startServer();
