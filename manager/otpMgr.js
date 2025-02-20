const db = require('../database/db');
const AppException = require('../error/appException');
const ErrorCodes = require('../error/errorCodes');

const Otp = {
    insertOtp: async (identifier, otp, expiresAt) => {
        try {
            await db.query(
                `INSERT INTO otps (identifier, otp, expires_at) 
                VALUES (?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                otp = VALUES(otp), 
                expires_at = VALUES(expires_at)`,
                [identifier, otp, expiresAt]
            );
            return true;
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    },

    deleteOtp: async (identifier) => {
        try {
            await db.query(
                `DELETE FROM otps WHERE identifier = ?`,
                [identifier]
            );
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    },

    findOtp: async (identifier) => {
        try {
            const [result] = await db.query(
                `SELECT * FROM otps WHERE identifier = ? AND expires_at > NOW()`,
                [identifier]
            );
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    }
}

module.exports = Otp;