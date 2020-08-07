const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")
var loginWindow, courseSelectionWindow

function createWindow() {
    loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    loginWindow.loadURL(isDev
        ? "http://localhost:3000/app/login/login.html"
        : `file://${path.join(__dirname, "../build/login/login.html")}`)
}

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