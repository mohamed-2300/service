const amqp = require('amqplib');
require('dotenv').config();

let channel;

async function startRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();
    console.log('Connexion RabbitMQ établie (event-service)');
  } catch (error) {
    console.error('Erreur RabbitMQ:', error);
  }
}

function publishMessage(queue, message) {
  if (channel) {
    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message envoyé à la file "${queue}"`, message);
  }
}

module.exports = startRabbitMQ;
module.exports.publishMessage = publishMessage;
