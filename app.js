const express = require('express');
const db = require('./database/db');
const app = express();

const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_URL || 'http://localhost'; // 读取域名

// Middleware to parse JSON requests
app.use(express.json());

// 引入路由
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running ${process.env.NODE_ENV} mode at ${HOST}:${PORT}/`);
});
