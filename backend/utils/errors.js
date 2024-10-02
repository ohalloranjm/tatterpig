class AuthorizationError extends Error {
  constructor(...params) {
    super(...params);
    this.title = 'Not Authorized';
    this.message =
      this.message || 'You do not have permission to access this resource';
    this.status = 403;
  }
}

class NotFoundError extends Error {
  constructor(...params) {
    super(...params);
    this.title = 'Resource Not Found';
    this.status = 404;
  }
}

module.exports = { AuthorizationError, NotFoundError };
