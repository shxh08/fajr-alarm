const db = require("./db.js");

// Example: record a missed prayer today
const stmt = db.prepare("INSERT INTO logs (date, status) VALUES (?, ?)");
stmt.run(new Date().toISOString().slice(0, 10), "missed");

console.log("Logged today's prayer as missed!");
