const db = require('../database/db');
const AppException = require('../error/appException');
const ErrorCodes = require('../error/errorCodes');

const Token = {
    insertToken: async (token, user, expiresAt) => {
        try {
            await db.query(
                `INSERT INTO tokens (user_id, token, expires_at) 
                 VALUES (?, ?, ?) 
                 ON DUPLICATE KEY UPDATE 
                 token = VALUES(token), 
                 expires_at = VALUES(expires_at)`,
                [user.id, token, expiresAt]  // 这里传入参数数组
            );
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    },

    deleteToken: async (token)=> {
        try {
            await db.query("DELETE FROM tokens WHERE token = ?", [token]);
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);

        }
    },

    getToken: async (token) => {
        try {
            const [result] = await db.query("SELECT * FROM tokens WHERE token = ? AND expires_at > NOW()", [token]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    }
}

module.exports = Token;