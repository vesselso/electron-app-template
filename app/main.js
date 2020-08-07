const { app, BrowserWindow, ipcMain } = require('electron')
var loginWindow, courseSelectionWindow

function createWindow() {
    loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    loginWindow.loadFile('app/login/login.html')
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

ipcMain.on('sim-after-login-scrape', (event, arg) => {
    // Create the course selection window
    courseSelectionWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    courseSelectionWindow.loadURL("http://localhost:3000/courseselection.html")
    // Close the login window
    loginWindow.close()
})
