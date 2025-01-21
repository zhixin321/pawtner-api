const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const dotenv = require('dotenv');

// Determine the environment
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.debug';

// Load the corresponding .env file
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.error(`Error: ${envFile} not found!`);
  process.exit(1); // Exit if .env file is missing
}
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database');
    }
});

// Create a GET route to fetch all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Create a POST route to insert a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    const query = 'INSERT INTO user (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId, name, email });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.DB_HOST}`);
});