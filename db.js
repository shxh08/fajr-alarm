const Database = require("better-sqlite3");

const db = new Database("fajr.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    status TEXT CHECK(status IN ('prayed','missed')) NOT NULL
  )
`);

module.exports = db;
