# Ishan_OS Portfolio 🖥️🚀

**Ishan_OS** is an immersive, interactive web portfolio designed to simulate a modern desktop operating system. Built with **React 19** and **Vite**, it features a fully functional ZSH-style terminal, window management system and mini-applications, offering a unique way to explore my professional background and technical skills.

## 🌟 System Features

### 💻 Interactive Terminal Shell
A robust command-line interface allowing users to navigate the portfolio using standard Unix-like commands.
* **File System Navigation**: `cd`, `ls`, `cat` to explore directories and read files (About, Resume, Projects).
* **System Control**: `reboot`, `clear`, `exit` and `whoami`.
* **App Launching**: Open applications directly via command line (e.g., `open game`).

### 🪟 Desktop Environment
* **Window Management**: Draggable and minimizing windows powered by **Framer Motion**.
* **Taskbar & Start Menu**: Functional system tray with real-time clock, audio controls and application switching.
* **Desktop Icons**: Quick access to core applications like Terminal, Notes and Games.

### 🎮 Built-in Applications
1.  **Terminal**: The core navigation hub.
2.  **Notes**: A feedback tool that integrates with the user's email client.
3.  **HackerRun.exe**: A mini-game testing reflexes and precision.
4.  **Portfolio Modules**: Dedicated UI windows for Projects, Resume, and Contact forms.

## 🛠️ Tech Stack

* **Core**: React 19, Vite 7
* **Styling**: Tailwind CSS 3.4
* **Animations**: Framer Motion 12
* **3D Elements**: React Three Fiber / Drei
* **Icons**: React Icons (FontAwesome)

## 🚀 Installation & Setup

Follow these steps to boot up the system locally:

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/Ishan-malinda/Portfolio.IMS.git](https://github.com/Ishan-malinda/Portfolio.IMS.git)
    cd Portfolio.IMS/my-portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    ```

4.  **Access the System**
    Open your browser and navigate to `http://localhost:5173`.

## ⌨️ Terminal Commands

Once the system boots, try these commands in the terminal window:

| Command | Description |
| :--- | :--- |
| `help` | List all available commands |
| `ls` | List directory contents |
| `whoami` | Display current user info |
| `cat [file]` | Open a file (e.g., `cat about`, `cat resume`) |
| `cd [dir]` | Change directory (e.g., `cd projects`) |
| `open [app]` | Launch an app (e.g., `open game`, `open notes`) |
| `clear` | Clear the terminal screen |
| `reboot` | Restart the OS |

## 📂 Project Structure

```bash
src/
├── components/
│   └── BackgroundCanvas.jsx  # 3D/Animated Background
├── styles/                   # Global Tailwind configurations
├── App.jsx                   # Main OS Logic & Window Manager
├── TerminalLayout.jsx        # Taskbar & Desktop Layout
└── main.jsx                  # Entry Point
