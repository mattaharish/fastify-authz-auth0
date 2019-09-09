const jwt = require('jsonwebtoken');

const MISSING_HEADER = 'Authorization header is missing',
  INVALID_TOKEN = 'Invalid Authorization header';

const extractTokenData = request => {
  try {
    const authToken =
      (request.headers && request.headers.authorization) ||
      (request.body && request.body.authorization) ||
      request.query.authorization;

    if (!authToken) {
      throw MISSING_HEADER;
    }
    const [prefix, token] = authToken.split(' ');
    if (prefix !== 'Bearer') {
      throw INVALID_TOKEN;
    }
    const payload = jwt.decode(token);
    return {
      is_authorized: true,
      user_permissions: payload['permissions'] || []
    };
  } catch (error) {
    return { is_authorized: false, error };
  }
};

module.exports = { extractTokenData };
