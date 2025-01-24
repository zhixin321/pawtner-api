const express = require('express');
const db = require('./database/db');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Example GET route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user');
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example POST route to insert a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await db.query('INSERT INTO user (name, email) VALUES (?, ?)', [name, email]);
    res.json({ id: result.insertId, name, email });
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
