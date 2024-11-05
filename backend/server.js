const express = require('express');
const mysql = require('mysql2');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'testuser',
  password: 'TestUser@123',
  database: 'detrator',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoints
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  const sessionId = `session_${Math.random().toString(36).substring(2, 15)}`;
  res.json({ sessionId });
});

app.get('/api/comments', (req, res) => {
  const query = 'SELECT * FROM comments ORDER BY timestamp DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
  db.query(query, [username, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    const newComment = { id: result.insertId, username, comment, timestamp: new Date() };
    io.emit('newComment', newComment);
    res.status(201).json(newComment);
  });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
