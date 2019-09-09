module.exports = {
  INVALID_PERMISSIONS: {
    message: 'You must give an array of permissions to the auth function'
  },
  MISSING_PERMISSIONS: { message: 'Missing authorization permissions' },
  UNAUTHORIZED: {
    message: 'Insufficient permissions to perform an operation over a resource'
  },
  MISSING_HEADER: { message: 'Authorization header is missing' },
  INVALID_TOKEN: { message: 'Invalid Authorization header' }
};
