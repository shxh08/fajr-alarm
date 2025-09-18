const db = require("./db.js");

// Get all logs
const rows = db.prepare("SELECT * FROM logs").all();

console.log("Prayer Logs:");
rows.forEach(row => {
  console.log(`${row.id} | ${row.date} | ${row.status}`);
});
