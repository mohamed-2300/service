const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    channel = await connection.createChannel();
    console.log('Connecté à RabbitMQ (publisher - registrations)');
  } catch (error) {
    console.error('Erreur de connexion RabbitMQ:', error.message);
  }
};

const publishMessage = (queue, message) => {
  if (!channel) {
    console.error('RabbitMQ channel non initialisé');
    return;
  }

  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(`Message publié dans la file "${queue}" :`, message);
};

module.exports = { connectRabbitMQ, publishMessage };
