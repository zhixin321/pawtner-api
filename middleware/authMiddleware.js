const jwt = require("jsonwebtoken");
const express = require('express');

const JwtAuthentication = {
    generateJwt: (user) => {
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // 令牌包含的用户数据
            process.env.JWT_SECRET, // 你的加密密钥
            { expiresIn: "1h" } // 令牌有效期（这里是 1 小时）
        );
        return token;
    },
    verifyJwt: (req, res, next) => {
        const token = req.header("Authorization");

        if (!token) return res.status(401).json({ msg: "无效的令牌，访问被拒绝" });

        try {
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ msg: "令牌无效" });
        }
    }
}

module.exports = JwtAuthentication
