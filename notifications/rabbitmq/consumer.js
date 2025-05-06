const amqp = require('amqplib');
const Notification = require('../models/Notification');

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue('user_registered');
    console.log('Attente des messages dans la file user_registered...');

    channel.consume('user_registered', async (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log('[x] Notification reçue :', data);

      const notification = new Notification({
        userId: data.userId,
        message: `Vous êtes inscrit à l'événement "${data.eventTitle}"`
      });

      await notification.save();
      channel.ack(msg);
    });
  } catch (error) {
    console.error('Erreur RabbitMQ:', error.message);
  }
};

module.exports = connectRabbitMQ;
