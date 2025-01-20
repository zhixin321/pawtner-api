require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

const ENV = process.env.NODE_ENV || 'development'; // Defaults to 'development' if NODE_ENV is not set

// If in debug mode, load the .env.debug file
dotenv.config({ path: `.env.${ENV}` });

console.log(`Running in ${ENV} mode`);


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Create a MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',    // Your MySQL username (default is 'root')
//   password: '',    // Your MySQL password (default is empty for local installations)
//   database: 'pawtner'
// });

// const db = mysql.createConnection({
//     host: 'bfotx4ek5zaan9hn8zey-mysql.services.clever-cloud.com',
//     user: 'udlffsfxkpvdedfc',    // Your MySQL username (default is 'root')
//     password: '5svVgNwjuY1AWRXRwedb',    // Your MySQL password (default is empty for local installations)
//     database: 'bfotx4ek5zaan9hn8zey'
//   });

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
  console.log(`Server is running on http://localhost:${PORT}`);
});
