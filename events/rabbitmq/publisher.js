const amqp = require('amqplib');

let channel;

async function startRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connexion RabbitMQ établie (event-service)');
  } catch (error) {
    console.error('Erreur RabbitMQ:', error.message);
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
