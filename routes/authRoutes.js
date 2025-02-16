const express = require("express");
const User = require("../manager/userMgr");
const Token = require("../manager/tokenMgr");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const ResponseData = require("../model/responseData.js");
const AppException = require("../error/appException.js");
const ErrorCodes = require("../error/errorCodes.js");

// 用户登录
router.post("/login", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findUserByEmail(email);
        if (!user) {
            throw new AppException(ErrorCodes.NOT_FOUND);
        }

        const expiresIn = 60 * 60; // 1 hours
        const token = authMiddleware.generateJwt(user, expiresIn);

        const expiresAt = new Date(Date.now() + expiresIn * 1000); // 计算过期时间
        await Token.insertToken(token, user, expiresAt);

        const response = ResponseData.success({ token, user });
        res.json(response.toJSON());
    } catch (error) {
        const response = ResponseData.error(error);
        res.status(error.statusCode).json(response.toJSON());
    }
});

// 用户登录
router.post("/logout", authMiddleware.verifyJwt, async (req, res) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            throw new AppException(ErrorCodes.UNAUTHORIZED);
        }

        await Token.deleteToken(token.replace("Bearer ", ""));
        const response = ResponseData.success();
        res.json(response.toJSON());
    } catch (error) {
        const response = ResponseData.error(error);
        res.status(error.statusCode).json(response.toJSON());
    }
});

// 获取用户信息（需身份验证）
router.get("/user", authMiddleware.verifyJwt, async (req, res) => {
    try {
        const user = await User.findUserById(req.user.id);
        if (!user) return res.status(404).json({ msg: "用户不存在" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "服务器错误" });
    }
});

// 获取所有用户列表
router.get("/users", authMiddleware.verifyJwt, async (req, res) => {
    try {
        const users = await User.getAllUser();
        const response = ResponseData.success({ users: users });
        res.json(response.toJSON());
    } catch (error) {
        const response = ResponseData.error(error);
        res.status(error.statusCode).json(response.toJSON());
    }
});

module.exports = router;