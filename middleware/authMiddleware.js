const jwt = require("jsonwebtoken");
const Token = require("../model/tokenModel");

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
        const token = req.header("Authorization").replace("Bearer ", "");
        console.log(token);
        if (!token) return res.status(401).json({ msg: "无效的令牌，访问被拒绝" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // check token is valid
            const result = await Token.getToken(token);
            if (result == null) {
                return res.status(401).json({ msg: "令牌无效或已过期" });
            }

            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ msg: "令牌无效" });
        }
    }
}

module.exports = JwtAuthentication
