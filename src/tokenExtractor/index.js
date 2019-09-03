const decodeToken = require("./decodeToken");

const TokenExtractor = (request, reply, next) => {
  let auth_info = { is_authorized: false };

  const authHeader = request.headers["authorization"];
  if (!authHeader) {
    auth_info.error = "Authorization header is missing";
  } else {
    const [prefix, token] = authHeader.split(" ");
    if (prefix !== "Bearer") {
      auth_info.error = "Invalid Authorization header";
    } else {
      const { tenant_id, is_authorized, error } = decodeToken.extractTokenData(
        token
      );
      request.headers.tenant = tenant_id;
      auth_info.is_authorized = is_authorized;
      if (!is_authorized) auth_info.error = error;
    }
  }
  request.headers.auth_info = auth_info;
  next();
};

module.exports = TokenExtractor;
