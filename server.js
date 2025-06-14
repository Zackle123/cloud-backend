const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db.sqlite');

app.use(cors());
app.use(express.json());

app.get('/questions', (req, res) => {
  db.all('SELECT id, question, options FROM questions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach(q => q.options = JSON.parse(q.options));
    res.json(rows);
  });
});

app.post('/submit', (req, res) => {
  const { answers } = req.body;
  db.all('SELECT id, correct FROM questions', [], (err, rows) => {
    let score = 0;
    rows.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });
    res.json({ score, total: rows.length });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
