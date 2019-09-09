const _ = require('lodash');

const decodeToken = require('./decodeToken');

const {
  INVALID_PERMISSIONS,
  MISSING_PERMISSIONS,
  UNAUTHORIZED
} = require('./_consts');

const Authorizaton = function(request, reply, next) {
  const {
    user_permissions,
    is_authorized,
    error
  } = decodeToken.extractTokenData(request);

  if (!is_authorized) {
    return reply.code(403).send(error);
  }
  if (!_.intersection(this.permissions, user_permissions).length) {
    return reply.code(403).send(UNAUTHORIZED);
  }
  next();
};

function authZ(permissions, options) {
  if (!Array.isArray(permissions)) {
    throw new Error(INVALID_PERMISSIONS);
  }
  if (!permissions.length) {
    throw new Error(MISSING_PERMISSIONS);
  }
  return Authorizaton.bind({ permissions, options });
}

module.exports = { authZ };
