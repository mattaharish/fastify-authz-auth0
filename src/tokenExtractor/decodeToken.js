const jwt = require("jsonwebtoken");
const { TENANT_KEY } = require("../config");

// TODO: Change token location
const extractTokenData = token => {
  try {
    const payload = jwt.decode(token);
    return { is_authorized: true, tenant_id: payload[TENANT_KEY].tenant_id };
  } catch (error) {
    return { is_authorized: false, error };
  }
};

module.exports = { extractTokenData };
