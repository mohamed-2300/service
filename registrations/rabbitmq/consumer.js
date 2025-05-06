const amqp = require('amqplib');
let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connecté à RabbitMQ (consumer - registrations)');

    await channel.assertQueue('newEvent');
    await channel.consume('newEvent', msg => {
      const event = JSON.parse(msg.content.toString());
      console.log('[x] Reçu nouvel événement:', event);
      channel.ack(msg);
    });

    await channel.assertQueue('event_supprimes');
    await channel.consume('event_supprimes', msg => {
      const event = JSON.parse(msg.content.toString());
      console.log('[x] Reçu événement mis à jour:', event);
      channel.ack(msg);
    });
  } catch (error) {
    console.error('Erreur de connexion RabbitMQ:', error.message);
  }
};

module.exports = connectRabbitMQ;
