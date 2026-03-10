
<img width="1913" height="1035" alt="image" src="https://github.com/user-attachments/assets/f5e271d9-6ab4-4800-9ed7-c7e32f97bccd" />

# BATTLE OS — Personal Performance Operating System

> *"Discipline is doing what you have to do, when you have to do it, even when you don't want to."*

---

## What is BATTLE OS?

**BATTLE OS** is a personal performance dashboard built in React, designed for people who operate with an elite mindset. This is not a generic productivity app — it's a **personal war system** that forces you to measure, track, and be accountable for every critical area of your life.

The system is based on the **0.1% Protocol**: the philosophy that the top 0.1% don't have better resources, they have better decision architecture and zero-excuse execution.

---

## Project Goal

Build a tool that replaces vague intuition with **real data**. Every week has a global score target of **8.0 / 10.0**. If you don't hit it, the dashboard tells you straight — no sugarcoating.

**Active week:** MAR 09 — 15, 2026 · Quito → World

---

## 7 Performance Vectors

The system simultaneously tracks 7 life dimensions, each with specific metrics and weekly targets:

| Vector | Color | Focus |
|---|---|---|
| **CYBER** | `#00f5d4` | Offensive security, labs, certifications, CVE research |
| **PHYSICAL** | `#ff6b35` | Split training, Zone 2 cardio, sleep, nutrition |
| **LANGUAGES** | `#b48eff` | Technical English, speaking, Anki vocabulary, reading |
| **BRAND** | `#ff9f1c` | Public content, elite community, portfolio, bug bounty |
| **FINANCE** | `#ff3860` | Premium skills, income stack, investment, global market |
| **IMPACT** | `#ffd60a` | TECHO leadership, Q2 social action, mentoring |
| **MIND** | `#39ff14` | Piano, reading, journaling, meditation, second language |

---

## Features

### Main Dashboard
Executive view of current status: real-time global score, comparison against the 8.0 target, breakdown of all 7 vectors, and weekly physical split progress.

### Daily Schedule
Hour-by-hour blocked agenda for all 7 days of the week. Each block has an assigned vector, duration, tactical detail, and KPI references. Blocks can be marked as completed.

### KPIs / Tracking
Manual input of all metrics per vector. Numeric and boolean inputs with real-time progress bars. Score calculated automatically per vector and globally.

### Week View
Panoramic view of all 7 days with total hours per vector, physical split, and percentage of completed blocks per day.

### Calorie Tracker
Daily intake log by meal (breakfast, lunch, snack, appetizers) with a 1,950 kcal/day target. Includes weekly visualization with comparative bars and daily status (ON POINT / EXCESS / DEFICIT).

### Pomodoro Timer
Timer with presets (Focus 25min, Short 5min, Long 15min, Deep Work 90min) and custom time input. Includes session history with accumulated time for the day.

---

## Data Persistence

All data is automatically saved using the artifact storage API (`window.storage`). No progress is lost between sessions:

- Completed schedule blocks
- KPI values per vector
- Daily calorie log
- Timer session history

---

## Tech Stack

| Technology | Usage |
|---|---|
| **React** | Main framework with hooks (`useState`, `useEffect`, `useRef`) |
| **CSS-in-JS** | Inline styles + `<style>` tag with keyframes and global classes |
| **Google Fonts** | IBM Plex Mono + Barlow Condensed |
| **window.storage API** | Data persistence across sessions |
| **SVG** | Timer progress circle (`strokeDashoffset` stroke animation) |

---

## Installation & Usage
```bash
# Clone the repository
git clone https://github.com/your-username/battle-os.git
cd battle-os

# Install dependencies
npm install

# Start development server
npm start
```

App runs at `http://localhost:3000`

---

## Code Architecture
```
src/
└── App.js
    ├── VECTORS[]          — Definition of the 7 vectors and their metrics
    ├── WORKOUT_SPLIT{}    — Weekly physical split with exercises
    ├── SCHEDULE{}         — Full hour-by-hour schedule (7 days)
    ├── computeScore()     — Score calculation per vector
    ├── computeDayPct()    — Completed block percentage per day
    ├── <CalorieTracker/>  — Calorie tracking component
    ├── <PomodoroTimer/>   — Timer component
    ├── <Dashboard/>       — Main executive view
    └── <App/>             — Root: navigation, global state, storage
```

---

## Screenshots

> *(Images coming soon)*

---

## Design Philosophy

The design follows a **terminal / military HUD** aesthetic: near-black background (`#020508`), monospaced typography, neon colors per vector, and zero unnecessary decorative elements. Every pixel communicates data, not decoration.

---

## Roadmap

- [ ] Weekly data export to CSV
- [ ] Week-over-week comparison
- [ ] Schedule block notifications
- [ ] Automatic Sunday audit mode
- [ ] Optimized mobile version

---

## Disclaimer

This system was built for intensive personal use. The targets, schedules, and metrics are calibrated for a specific profile. You can and should adapt `VECTORS`, `SCHEDULE`, and `WORKOUT_SPLIT` to your own reality.

---

<div align="center">
  <strong>WEEK 1 OF 520</strong><br/>
  <sub>AUDIT SUN MAR 15 · 23:59 ECT</sub>
</div>
