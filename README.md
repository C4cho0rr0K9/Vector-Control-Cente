# ⚡ Vector Dashboard — React Setup Guide

A step-by-step guide to scaffold a React project from scratch using `create-react-app` and launch it as a native desktop app.

---

## 📋 Prerequisites

Make sure Node.js and npm are installed on your system.
```bash
sudo apt update
sudo apt install nodejs npm
```

---

## 🚀 Step 1 — Create the Project

Navigate to your home directory and scaffold a new React app using `npx`.
```bash
cd ~
npx create-react-app vector-dashboard
cd vector-dashboard
```

> **💡 Why `npx` instead of `npm install -g`?**
>
> `npx` runs packages **without installing them globally** on your computer.
> This keeps your system clean — no junk accumulating over time.
> When you run `npx create-react-app`, it temporarily downloads `create-react-app@5.1.0`,
> uses it to scaffold your project, and then discards it.

---

## 📦 Package Installed

| Package | Version |
|---|---|
| `create-react-app` | `5.1.0` |

---

## ✏️ Step 2 — Edit the Main Component

Open `src/App.js` in your editor:
```
vector-dashboard/
└── src/
    └── App.js   ← edit this file
```

Replace the default content with your custom dashboard code:
```jsx
// src/App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Vector Dashboard</h1>
      {/* Your component code here */}
    </div>
  );
}

export default App;
```

---

## ▶️ Step 3 — Run the App

Start the development server:
```bash
npm start
```

The app will automatically open at **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🖥️ Step 4 — Launch as a Native Desktop App

To open the dashboard as a standalone window (without browser tabs or URL bar), create a `.desktop` shortcut file.

### Create the shortcut file
```bash
nano ~/.local/share/applications/vector-control.desktop
```

### Paste the following content
```ini
[Desktop Entry]
Name=Vector Control
Comment=Vector Dashboard
Exec=chromium-browser --app=http://localhost:3000
Icon=utilities-terminal
Terminal=false
Type=Application
Categories=Utility;
```

> **💡 What does `--app` do?**
>
> The `--app=` flag tells Chromium to open the URL in **app mode** — a minimal window with no address bar, tabs, or browser UI. It feels like a native desktop application.

Save with `Ctrl+O`, then exit with `Ctrl+X`.

---

## 🗂️ Project Structure
```
vector-dashboard/
├── public/
├── src/
│   ├── App.js        ← main component
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
