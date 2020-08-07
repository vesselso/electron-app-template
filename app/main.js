const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")
var loginWindow, courseSelectionWindow

/* Window Creation Functions */

function createWindow() {
    // TO-DO: Add logic to determine whether show login screen or main screen
    createLoginWindow()
}

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        width: 310,
        height: 535,
        webPreferences: {
            nodeIntegration: true
        }
    })
    loginWindow.loadURL(isDev
        ? "http://localhost:3000/app/login/login.html"
        : `file://${path.join(__dirname, "../build/login/login.html")}`)
}

function createInstallWindow() {
    courseSelectionWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })
      courseSelectionWindow.loadURL(isDev
        ? "http://localhost:3000/app/install/install.html"
        : `file://${path.join(__dirname, "../build/install/install.html")}`)
}

/* App Logic */

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

/* IPC Processes */

ipcMain.on('sim-after-login-scrape', (event, arg) => {
  // Create the course selection window
  createInstallWindow()
  // Close the login window
  loginWindow.close()
})

ipcMain.on('install-to-login', (event, arg) => {
    // Create the course selection window
    createLoginWindow()
    // Close the login window
    courseSelectionWindow.close()
})