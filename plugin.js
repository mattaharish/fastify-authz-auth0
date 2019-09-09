const fp = require('fastify-plugin');
const { authZ } = require('./src/auth');

function authPlugin(fastify, options, next) {
  fastify.decorate('auth', authZ);
  next();
}

module.exports = fp(authPlugin, { name: 'cmp-authZ' });
