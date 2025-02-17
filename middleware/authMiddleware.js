const jwt = require("jsonwebtoken");
const Token = require("../manager/tokenMgr");
const AppException = require("../error/appException");
const ErrorCodes = require("../error/errorCodes");
const ResponseData = require("../model/responseData");

const JwtAuthentication = {
    generateJwt: (user, expiresIn) => {
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // 令牌包含的用户数据
            process.env.JWT_SECRET, // 你的加密密钥
            { expiresIn: expiresIn } // 令牌有效期（这里是 1 小时）
        );
        return token;
    },

    verifyJwt: async (req, res, next) => {
        try {
            const header = req.header("Authorization");
            if (!header) {
                throw new AppException(ErrorCodes.UNAUTHORIZED);
            }

            const token = header.replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // check token is valid
            const result = await Token.getToken(token);
            if (result == null) {
                throw new AppException(ErrorCodes.UNAUTHORIZED);
            }
            req.user = decoded;
            next();
        } catch (error) {
            if (!(error instanceof AppException)) {
                error = new AppException(ErrorCodes.UNAUTHORIZED);
            }
            const response = ResponseData.error(error);
            res.status(error.statusCode).json(response.toJSON());
        }
    }
}

module.exports = JwtAuthentication
