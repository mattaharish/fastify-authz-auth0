const fp = require('fastify-plugin');
const { authZ } = require('./src/auth');

async function authPlugin(fastify, _options) {
  fastify.decorate('auth', authZ);
}

module.exports = fp(authPlugin, { name: 'cmp-authZ' });
