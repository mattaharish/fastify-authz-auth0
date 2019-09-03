const envSchema = require("env-schema");

// TODO: Change properties
const schema = {
  type: "object",
  required: ["TENANT_KEY"],
  properties: {
    TENANT_KEY: {
      type: "string"
    }
  }
};

const config = envSchema({
  schema: schema,
  dotenv: true
});

module.exports = config;
