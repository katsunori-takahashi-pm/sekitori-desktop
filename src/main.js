const app = require('electron').app
const BrowserWindow = require('electron').BrowserWindow

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    userContentSize: true,
    fullscreen: true,
  });

  mainWindow.loadURL(`file://${__dirname}/html/index.html`)
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});