const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS questions`);
  db.run(`CREATE TABLE questions (
    id INTEGER PRIMARY KEY,
    question TEXT,
    options TEXT,
    correct INTEGER
  )`);

  const stmt = db.prepare("INSERT INTO questions (question, options, correct) VALUES (?, ?, ?)");
  stmt.run("What is 2 + 2?", JSON.stringify(["3", "4", "5"]), 1);
  stmt.run("Capital of Italy?", JSON.stringify(["Rome", "Paris", "Madrid"]), 0);
  stmt.run("What color is a banana?", JSON.stringify(["Red", "Yellow", "Blue"]), 1);
  stmt.finalize();

  console.log("Database seeded");
});
