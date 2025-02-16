const ErrorCodes = {
    // 4xx 客户端错误
    INVALID_INPUT: { code: 1001, message: "Invalid input data", statusCode: 400 },
    UNAUTHORIZED: { code: 1002, message: "Unauthorized access", statusCode: 401 },
    NOT_FOUND: { code: 1003, message: "Resource not found", statusCode: 404 },
    BAD_REQUEST: { code: 1004, message: "Bad request", statusCode: 400 },
    
    // 5xx 服务器错误
    INTERNAL_SERVER_ERROR: { code: 2001, message: "Internal server error", statusCode: 500 },
    DATABASE_ERROR: { code: 2002, message: "Database connection failed", statusCode: 500 },
  
    // 自定义错误代码可以继续添加
  };
  
  module.exports = ErrorCodes;
  