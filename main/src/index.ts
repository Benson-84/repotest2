import { app, BrowserWindow,ipcMain, Menu } from "electron";
import { Channel } from './channels/channel'
const path = require('path');
export var mainWindowId: number = 0
import { createMacMenu } from "./menu-macos";
const Store = require('electron-store');
const store = new Store();


function createMenu(window: Electron.BrowserWindow) {
  const template = createMacMenu(window)
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1240,
    height: 800,
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

  ipcMain.on('user-session-login', (event:Electron.IpcMainEvent, argument:any) => {
    console.log("=[user-session-login][token]==================================================================");
    console.log(argument)
    store.set('accessToken', argument.accessToken);
    store.set('refreshToken', argument.refreshToken);
  });

  win.loadFile('../renderer/index.html');
  if(process.env.ENV && process.env.ENV == "development") {
    win.loadFile('../renderer/index.html');
  } else {
    win.loadFile('./dist/renderer/index.html');
  }
  mainWindowId = win.id;

  createMenu(win);
}


app.on('ready', createWindow);


