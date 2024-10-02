class NotAuthorizedError extends Error {}

class NotFoundError extends Error {
  constructor(...params) {
    super(...params);
    this.title = 'Resource Not Found';
    this.status = 404;
  }
}

module.exports = { NotAuthorizedError, NotFoundError };
