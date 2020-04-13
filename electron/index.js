 const {app, BrowserWindow, ipcMain} = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      webviewTag: true,
      defaultEncoding: "utf-8",
      devTools: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegration: true
    }
  });

  win.openDevTools();
 
  // and load the index.html of the app.
  win.loadFile('../dist/index.html');

  ipcMain.handle("userLogin", (event, someArgument) => {
    console.log(event)
    return result;
  })
  
}
 
app.on('ready', createWindow);