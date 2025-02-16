const AppException = require("../error/appException");

class ResponseData {
    constructor(success, data = null, errorCode = null, errorMessage = "") {
      this.success = success;
      
      if (success) {
        if (data !== null) {
          this.data = data;
        }
      } else {
        this.error = errorCode;
        this.message = errorMessage;
      }
    }
  
    // 转换成 JSON（方便 res.json() 直接使用）
    toJSON() {
      return { ...this };
    }
  
    // 静态方法：成功响应
    static success(data = null) {
      return new ResponseData(true, data);
    }
  
    // 静态方法：失败响应
    static error(error) {
      if (error instanceof AppException) {
        return new ResponseData(false, null, error.errorCode, error.message);
      } else {
        return new ResponseData(false, null, 1010, "Internal Server Error");
      }
    }
  }
  
  module.exports = ResponseData;
  