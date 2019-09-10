// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});
const fp = require('fastify-plugin');
const auth = require('../plugin');

fastify.register(auth);

const routes = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/protected',
    preHandler: fastify.auth(['read:protected-route']),
    handler: async (request, reply) => {
      reply.code(200).send({ message: 'You have read access to this route !' });
    }
  });

  fastify.route({
    method: 'GET',
    url: '/public',
    handler: async (request, reply) => {
      reply.code(200).send({ message: 'This is a public route !!' });
    }
  });

};
// register a route
fastify.register(routes);

// Run the server!
fastify.listen(3000, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
