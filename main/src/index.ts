import { app, BrowserWindow,ipcMain } from "electron";
import { Channel } from './channels/channel'
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
  let channel = new Channel()


  ipcMain.on('internalMiniAppJsBridge',(event:Electron.IpcMainEvent,argument:any) => {
    console.log(argument);
    channel.invoke(argument)
    .then(res=> {
      event.reply('internalMiniAppJsBridgeCallback',res)
    }).catch(err => {
      event.reply('internalMiniAppJsBridgeCallback',err)
    })
  })

  console.log(app.getAppPath());
  win.loadFile('../renderer/index.html');

}
 
app.on('ready', createWindow);


