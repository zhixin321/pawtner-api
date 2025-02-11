const db = require('../database/db');
require("dotenv").config();

async function migrate() {

    // 创建 users 表（如果不存在）
    await db.query(`
        CREATE TABLE IF NOT EXISTS user (
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

    await db.query("ALTER TABLE user RENAME TO users;");
    console.log("users 表已修改为 users");

    // 修改 users 表（如果缺少字段，则添加）
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

    await db.end();
    console.log("数据库迁移完成！");
}

migrate().catch((err) => console.error("迁移失败:", err));