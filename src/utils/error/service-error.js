const AppError = require("./app-error");

class ServiceError extends AppError {
  constructor(error) {
    super();
    this.name = "ServiceError";
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = ServiceError;
