import { app, BrowserWindow,ipcMain } from "electron";
import { Channel } from './channels/channel'

export var mainWindowId: number = 0

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1980,
    height: 1020,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      webviewTag: true,
      defaultEncoding: "utf-8",
      devTools: true,
      nodeIntegrationInSubFrames: true
    }
  });
 
  // and load the index.html of the app.
  let channel = new Channel()
  
  ipcMain.on('internalMiniAppJsBridge',(event:Electron.IpcMainEvent,argument:any) => {
    
    var args = argument
    if (typeof argument === 'string') {
      args = JSON.parse(argument.trim())
    }
    channel.invoke(args)
    .then(res=> {
      console.log("on internalMiniAppJsBridge, res = " + JSON.stringify(res));
      
      event.reply('internalMiniAppJsBridgeCallback', res)
    }).catch(err => {
      if(err == 'tokenExprired') {
        BrowserWindow.fromId(mainWindowId).webContents.send('tokenExprired', null);
      }
    })
  })

  win.loadFile('../renderer/index.html');
  mainWindowId = win.id;
}
 
app.on('ready', createWindow);


