# fastify-authz-auth0

This module does not provide an authentication strategy, but it provides an utility to handle authorization in your routes, without adding overhead.

Check out the complete example [here](https://github.com/mattaharish/fastify-authz-auth0/blob/test/src/example.js).

## Install

```
npm i fastify-authz-auth0 --save
```

## Usage

Import this package in your `src/index.js` and register this plugin before registering your API routes.

```js
'use strict';

// Require the auth plugin
const auth = require('fastify-authz-auth0');
const routes = require('./app/v1');

function create() {
  //creates the core fastify server instance with defaults
  const fastify = core.createServer();

  //Register auth plugin before registering routes
  fastify.register(auth);
  
  //custom routes set up
  fastify.register(routes, { prefix: '/v1' });

  return fastify;
}

async function start() {
  const fastify = create();
  core.start(fastify);
}

module.exports = {
  create,
  start
};
```

And when defining API routes, make sure you have a `preHandler` calling this `auth` function, which is decorated to the fastify instance.

Example API `route` definition
```js
  fastify.route({
    method: 'GET',
    url: '/product-types/:productTypeId',
    schema: {
      params: {
        type: 'object',
        properties: {
          productTypeId: { type: 'string', format: 'uuid' }
        }
      },
      response: {
        200: getProductTypeByIdSuccessfulResponse,
        ...errorResponses
      }
    },
    // Pass the array of permissions for this route.
    preHandler: fastify.auth(['read:product-types']),
    handler: getProductTypeByIdHandler(fastify)
  });
```

## Authentication & Authorization

```Authentication confirms user/ service identity to grant access to the system.```

```Authorization determines whether the user/ service has permissions to access the resources.```

```
Auth0 provides authentication and authorization as a service. It takes the overhead of generating accessTokens with the list of permissions based on role of user.
```

The permissions inside the token are embedded like below:
```
...
 "permissions": [
    "read:product-types"
  ]
  ...
  ```


## How this plugin works

1. This plugin will check for `authorization` property containing the value in the form of `Bearer <Token(Generated By Auth0)>` in the request headers or body or query parameters.

2. Then the `token` is decoded using `jsonwebtoken` module and picks the `permissions` array in the token.
3. If the list of `permissions` which are passed, when calling the `auth` function in `preHandler` matches against the `permissions` obtained from the token then the `api` is served otherwise it responds with `403 {UnAuthorized}`


## Acknowledgements

This project is kindly sponsored by:


## License

Licensed under ---
