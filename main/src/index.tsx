import {app, BrowserWindow} from "electron";

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      webviewTag: true,
      defaultEncoding: "utf-8",
      devTools: true,
      nodeIntegrationInSubFrames: true,
    }
  });
 
  // and load the index.html of the app.

  console.log(app.getAppPath());
  win.loadFile('../renderer/index.html');

}
 
app.on('ready', createWindow);