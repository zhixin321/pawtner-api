const db = require('../database/db');
require("dotenv").config();

async function migrate() {

    /// *** USER TABLE ***
    // create users table
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            contact VARCHAR(20) NULL,
            role ENUM('owner', 'sitter') DEFAULT 'owner',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log("users 表已创建或已存在");

    // update users table 
    await db.query(`
        ALTER TABLE users
            ADD COLUMN IF NOT EXISTS contact VARCHAR(20) NULL,
            ADD COLUMN IF NOT EXISTS role ENUM('owner', 'sitter') DEFAULT 'owner',
            ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
    `).catch(err => {
        if (err.code !== "ER_DUP_FIELDNAME") {
            console.error("修改 users 表失败:", err);
        }
    });
    console.log("users 表已更新");

    /// *** TOKENS TABLE ***
    // create tokens table
    await db.query(`
        CREATE TABLE IF NOT EXISTS tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL UNIQUE,
            token TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `).catch(err => {
        if (err.code !== "ER_DUP_FIELDNAME") {
            console.error("修改 tokens 表失败:", err);
        }
    });
    console.log("tokens 表已创建或已存在");

    // create otps table
    await db.query(`
        CREATE TABLE IF NOT EXISTS otps (
            id INT AUTO_INCREMENT PRIMARY KEY,
            identifier VARCHAR(255) NOT NULL UNIQUE,
            otp VARCHAR(6) NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `).catch(err => {
        if (err.code !== "ER_DUP_FIELDNAME") {
            console.error("修改 otps 表失败:", err);
        }
    });
    console.log("otps 表已创建或已存在");

    await db.end();
    console.log("数据库迁移完成！");
}

migrate().catch((err) => console.error("迁移失败:", err));