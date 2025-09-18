// alarm.js
const db = require("./db.js");
const fs = require("fs");
const path = require("path");
const player = require("play-sound")();
const say = require("say");
const readline = require("readline");

// --- Files ---
const SCREAM = path.join(__dirname, "scream.mp3");
const LINES = JSON.parse(fs.readFileSync(path.join(__dirname, "lines.json"), "utf8"));

// --- Setup tables ---
db.exec(`
  CREATE TABLE IF NOT EXISTS alarm_state (
    id INTEGER PRIMARY KEY,
    last_triggered TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS alarm_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    line TEXT
  )
`);

// --- Helpers ---
function today() {
  return new Date().toISOString().slice(0, 10);
}

function missedLast7() {
  const row = db.prepare(`
    SELECT COUNT(*) AS c
    FROM logs
    WHERE status='missed'
      AND date >= date('now','-7 days')
  `).get();
  return row.c;
}

function alarmDone() {
  const row = db.prepare(`SELECT last_triggered FROM alarm_state WHERE id=1`).get();
  return row && row.last_triggered === today();
}

function markDone() {
  const existing = db.prepare(`SELECT id FROM alarm_state WHERE id=1`).get();
  if (existing) {
    db.prepare(`UPDATE alarm_state SET last_triggered=? WHERE id=1`).run(today());
  } else {
    db.prepare(`INSERT INTO alarm_state (id, last_triggered) VALUES (1, ?)`).run(today());
  }
}

function randomLine() {
  return LINES[Math.floor(Math.random() * LINES.length)];
}

function logAlarm(line) {
  const stmt = db.prepare("INSERT INTO alarm_logs (date,line) VALUES(?,?)");
  stmt.run(today(), line);
}

// --- Async helpers ---
function playScream() {
  return new Promise((resolve, reject) => {
    player.play(SCREAM, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function speakAsync(text) {
  return new Promise((resolve, reject) => {
    say.speak(text, null, 1.0, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function askAsync(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// --- Main alarm function ---
async function triggerAlarm() {
  console.log("🚨 Alarm triggered!");

  // Play scream first
  await playScream();

  // Speak the line
  const line = randomLine();
  await speakAsync(line);
  console.log("⚡ Alarm finished");

  // Log and mark done
  logAlarm(line);
  markDone();

  // Interactive repentance
  const PHRASES = [
    "astaghfirullah",
    "bismillah",
    "la ilaha illallah",
    "allahu akbar",
  ];
  const requiredPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];

  console.log(`\n⚡ REQUIRED PHRASE: ${requiredPhrase}`);
  const answer = await askAsync("Type the phrase: ");

  if (answer.trim().toLowerCase() === requiredPhrase) {
    console.log("✅ You are forgiven... this time.");
  } else {
    console.log("❌ Wrong... punishment continues.");
    // optional: re-trigger alarm or escalate punishment
  }
}

// --- Main check ---
function check() {
  const missed = missedLast7();
  console.log("Missed in last 7 days:", missed);

  if (missed >= 2 && !alarmDone()) {
    triggerAlarm();
  } else {
    console.log("✅ Safe for now.");
  }
}

// Run once + repeat every 30s
check();
setInterval(check, 30_000);
