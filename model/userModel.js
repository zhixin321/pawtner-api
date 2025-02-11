const db = require('../database/db');

// 查找用户
async function findUserByEmail(email) {
    const [users] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    return users.length > 0 ? users[0] : null;
}

// 创建用户
async function createUser(name, email, hashedPassword, role) {
    await db.query("INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role || "owner"]);
}

// 查找用户（通过 ID）
async function findUserById(id) {
    const [users] = await db.query("SELECT id, name, email, role FROM user WHERE id = ?", [id]);
    return users.length > 0 ? users[0] : null;
}

async function getUserList() {
    const [users] = await db.query("SELECT id, name, email, contact, role, created_at FROM user");
    return users;
}

const User = {
    findUserByEmail: async (email) => {
        try {
            const [users] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw error;
        }
    },

    createUser: async (name, email, hashedPassword, role) => {
        try {
            await db.query("INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, role || "owner"]);
        } catch (error) {
            throw error;
        }
    },

    findUserById: async (id) => {
        try {
            const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw error;
        }
    },

    getAllUser: async () => {
        try {
            const [users] = await db.query("SELECT * FROM users");
            return users;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;