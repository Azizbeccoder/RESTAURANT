// ============================================================
// libs/types/errors.ts
// Custom Error class + HTTP codes + Messages
// ============================================================

export enum Httpcode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
  CREATE_FAILED = "Creation failed. Please check your input and try again.",
  NO_MEMBER_NICK = "No member found with that nickname.",
  WRONG_PASSWORD = "Incorrect password.",
  NOT_AUTHENTICATED = "Authentication required. Please log in.",
  NOT_AUTHORIZED = "You do not have permission to perform this action.",
}

class Errors extends Error {
  public statusCode: Httpcode;

  constructor(statusCode: Httpcode, message: Message | string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export default Errors;
