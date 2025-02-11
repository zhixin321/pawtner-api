const db = require('../database/db');

// 查找用户
async function findUserByEmail(email) {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return users.length > 0 ? users[0] : null;
}

// 创建用户
async function createUser(name, email, hashedPassword, role) {
    await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
                     [name, email, hashedPassword, role || "owner"]);
}

// 查找用户（通过 ID）
async function findUserById(id) {
    const [users] = await pool.query("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
    return users.length > 0 ? users[0] : null;
}

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
};