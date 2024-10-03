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

class BadRequestError extends Error {
  constructor(errors, ...params) {
    super(...params);
    this.status = 400;
    this.title = 'Bad Request';
    this.message = this.message || 'Bad request.';
    this.errors = errors;
  }
}

module.exports = { AuthorizationError, NotFoundError, BadRequestError };
