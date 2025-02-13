const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 用户注册
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (await User.findUserByEmail(email)) {
            return res.status(400).json({ msg: "邮箱已被注册" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser(name, email, hashedPassword, role);

        res.status(201).json({ msg: "注册成功" });
    } catch (err) {
        res.status(500).json({ msg: "服务器错误" });
    }
});

// 用户登录
router.post("/login", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findUserByEmail(email);
        if (!user) return res.status(400).json({ msg: "用户不存在" });

        const expiresIn = 60 * 60; // 1 hours
        const token = authMiddleware.generateJwt(user, expiresIn);

        const expiresAt = new Date(Date.now() + expiresIn * 1000); // 计算过期时间
        await Token.insertToken(token,user,expiresAt);

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "服务器错误" });
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
        const [users] = await User.getAllUser();
        res.json({ success: true, users });
    } catch (error) {
        console.error("获取用户列表失败:", error);
        res.status(500).json({ success: false, message: "服务器错误" });
    }
});

module.exports = router;