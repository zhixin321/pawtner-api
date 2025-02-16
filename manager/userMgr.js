const db = require('../database/db');
const AppException = require('../error/appException');
const ErrorCodes = require('../error/errorCodes');

const User = {
    findUserByEmail: async (email) => {
        try {
            const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    },

    createUser: async (name, email, hashedPassword, role) => {
        try {
            await db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, role || "owner"]);
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    },

    findUserById: async (id) => {
        try {
            const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    },

    getAllUser: async () => {
        try {
            const [users] = await db.query("SELECT * FROM users");
            return users;
        } catch (error) {
            throw new AppException(ErrorCodes.DATABASE_ERROR);
        }
    }
}

module.exports = User;