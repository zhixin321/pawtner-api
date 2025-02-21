const ErrorCodes = {
  // 4xx 客户端错误
  // 400:客户端请求有误，例如参数错误、格式错误
  // 401:用户未授权，例如 Token 过期或无效
  // 404:请求的资源不存在
  INVALID_INPUT: { code: 1001, message: "Invalid input data", statusCode: 400 },
  UNAUTHORIZED: { code: 1002, message: "Unauthorized access", statusCode: 401 },
  FORBIDDEN: { code: 1003, message: "Permission denied", statusCode: 401 },
  NOT_FOUND: { code: 1004, message: "Resource not found", statusCode: 404 },
  BAD_REQUEST: { code: 1005, message: "Bad request", statusCode: 400 },
  REQUEST_TIME_OUT: { code: 1006, message: "Request timeout", statusCode: 400 },
  INVALID_FORMAT: { code: 1007, message: "Invalid format"	, statusCode: 400 },

  // 5xx 服务器错误
  INTERNAL_SERVER_ERROR: { code: 2001, message: "Internal server error", statusCode: 500 },
  DATABASE_ERROR: { code: 2002, message: "Database connection failed", statusCode: 500 },

  // 自定义错误代码可以继续添加
  USER_NOT_FOUND: { code: 3001, message: "User not found", statusCode: 400 },
  ACCOUNT_LOCKED: { code: 3002, message: "Account locked"	, statusCode: 400 },
  ACCOUNT_DEACTIVATE: { code: 3003, message: "Account deactivate"	, statusCode: 400 },
  IDENTIFIER_UNVAILABLE: { code: 3004, message: "Email or contact already in use"	, statusCode: 400 },

};

module.exports = ErrorCodes;
