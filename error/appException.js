class AppException extends Error {
  constructor(error, message = "", statusCode = 400) {
    // 如果 message 没有提供，则使用常量中的 message
    message = message || error.message;

    super(message);
    this.name = this.constructor.name;
    this.errorCode = error.code;  // 从错误常量中取 errorCode
    this.statusCode = error.statusCode || statusCode;  // 使用默认的 statusCode

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      errorCode: this.errorCode,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

module.exports = AppException;