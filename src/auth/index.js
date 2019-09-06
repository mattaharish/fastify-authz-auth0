const fp = require('fastify-plugin');
const _ = require('lodash');

const decodeToken = require('./decodeToken');

const INVALID_PERMISSIONS =
    'You must give an array of permissions to the auth function',
  MISSING_PERMISSIONS = 'Missing authorization permissions',
  UNAUTHORIZED = 'User UnAuthorized to access this API';

const Authorizaton = function(request, reply, next) {
  const {
    user_permissions,
    is_authorized,
    error
  } = decodeToken.extractTokenData(request);
  console.log(user_permissions);
  console.log(this.permissions);
  if (!is_authorized) {
    return reply(403).send(error);
  }
  if (!_.intersection(this.permissions, user_permissions).length) {
    return reply.code(403).send(UNAUTHORIZED);
  }
  next();
};

function authZ(permissions, options) {
  console.log('----------', permissions);
  if (!Array.isArray(permissions)) {
    throw new Error(INVALID_PERMISSIONS);
  }
  if (!permissions.length) {
    throw new Error(MISSING_PERMISSIONS);
  }
  return Authorizaton.bind({ permissions, options });
}

function authPlugin(fastify, options, next) {
  fastify.decorate('auth', authZ);
  next();
}

module.exports = fp(authPlugin, { name: 'cmp-authZ' });
