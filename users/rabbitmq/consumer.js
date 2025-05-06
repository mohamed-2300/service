
const amqp = require('amqplib');

async function startConsumer() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Déclarer les files d’écoute
    const queues = ['newEvent', 'event_supprimes', 'inscriptionAnnule'];

    for (const queue of queues) {
      await channel.assertQueue(queue, { durable: false });

      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          console.log(`Message reçu dans la file "${queue}":`, content);

          // Ici tu peux traiter les messages si nécessaire
          // Exemple : enregistrer une info dans une autre collection

          channel.ack(msg);
        }
      });

      console.log(`En écoute sur la file: ${queue}`);
    }
  } catch (err) {
    console.error('Erreur RabbitMQ:', err.message);
  }
}

module.exports = startConsumer;