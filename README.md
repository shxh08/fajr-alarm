````markdown
# ⏰ Fajr Alarm CLI

A command-line alarm system designed to help users consistently perform Fajr prayer by tracking missed prayers and triggering alerts.  

This project uses Node.js and SQLite to track prayer logs and provide audio prompts and motivational (or stern) reminders.

---

## ✨ Features

- **Prayer Logging**: Track whether Fajr prayer was performed or missed.  
- **Missed Prayer Detection**: Checks missed prayers in the past 7 days.  
- **Alarm Triggering**: Plays a loud scream and text-to-speech message if conditions are met.  
- **Interactive Repentance Mode**: Users must type a randomly chosen phrase to acknowledge the alert.  
- **Logs**: Stores alarm triggers and phrases used in SQLite.  

---

## 🛠️ Tech Stack

- **Node.js**: Runtime environment.  
- **better-sqlite3**: Lightweight SQLite database library.  
- **play-sound**: Plays audio alerts.  
- **say**: Text-to-speech engine.  
- **readline**: Interactive command-line input.  

---

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fajr-alarm.git
cd fajr-alarm
````

2. **Install dependencies**

```bash
npm install
```

3. **Run the alarm system**

```bash
node alarm.js
```

> The script will check missed prayers and trigger alerts if necessary.

---

## 📂 Project Structure

```
fajr-alarm/
├── alarm.js           # Main alarm logic
├── db.js              # Database connection
├── log.js             # Helper for logging prayers
├── checkLogs.js       # View past prayer logs
├── generate-lines.js  # Generate motivational/alarm lines
├── lines.json         # Predefined alert messages
├── scream.mp3         # Audio file for alarm
├── package.json
├── package-lock.json
└── fajr.db            # SQLite database
```

---

## 📌 Notes

* This project is primarily a learning exercise in Node.js and SQLite.
* Database (`fajr.db`) stores logs and alarm state.
* Audio and text alerts are intended for personal use.

---

## 🔮 Future Enhancements

* Web-based interface for easier interaction.
* Personalized alarm messages based on user history.
* Community mode or challenge mode for accountability.

---

## 📚 What I Learned

* Integrating SQLite with Node.js.
* Handling asynchronous operations in command-line scripts.
* Working with audio playback and text-to-speech in Node.js.
* Designing a simple CLI tool with interactive prompts.

```

---
