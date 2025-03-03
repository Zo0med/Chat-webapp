class CustomAPIError extends Error{
    constructor(message){
        super(message)
    }
}

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.stack = ""
    }
}
class UnAuthorizedError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = 401
        this.stack = "";
    }
}
class ForbiddenError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.stack = "";
    }
}
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.stack = "";

    }
}
class ConflictError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 409;
        this.stack = "";
    }
}
class InternalError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.stack = "";
    }
}

module.exports = {
    CustomAPIError,
    ConflictError,
    InternalError,
    NotFoundError,
    ForbiddenError, 
    BadRequestError, 
    UnAuthorizedError
}