const mysql = require('mysql2');
const dotenv = require('dotenv');
const { envPath } = require('../config');

dotenv.config({ path: envPath });

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });


// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.message);
//     } else {
//         console.log('Connected to the MySQL database');
//     }
// });

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  // Export the promise-based pool
  module.exports = pool.promise();
