const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: '', 
  database: 'crud'
});


db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err) => {
    if (err) {
      console.error('Error:', err); 
      res.json({ success: false, message: 'Signup failed' });
    } else {
      res.json({ success: true });
    }
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err || results.length === 0) {
      res.json({ success: false, message: 'Invalid credentials' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
