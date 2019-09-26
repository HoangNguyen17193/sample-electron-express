const {app, BrowserWindow} = require('electron');
const path = require('path');
const server = require('./server/index.js');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  server();
  createWindow();
  mainWindow.loadURL('http://localhost:7777');
  mainWindow.focus();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

