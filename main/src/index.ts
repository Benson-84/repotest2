import { app, BrowserWindow,ipcMain, Menu } from "electron";
import { Channel } from './channels/channel'
const path = require('path');
export var mainWindowId: number = 0
import { createMacMenu } from "./menu-macos";
const Store = require('electron-store');
const store = new Store();
let globalWin:BrowserWindow;

const entryFile = (process.env.ENV && process.env.ENV == "development") ? '../renderer/index.html' : './dist/renderer/index.html';
const defaultEnv = (process.env.ENV && process.env.ENV == "development") ? "staging" : "production";

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

  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === 'modal') {
      // open window as modal
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        parent: win,
        width: 100,
        height: 100
      })
      event.newGuest = new BrowserWindow(options)
    }
  });
  
  globalWin = win;
  mainWindowId = win.id;

  reload();
  createMenu(win);

}


export function reload(env=defaultEnv) {
  globalWin.loadFile(entryFile, {query: {env: env}});
}

app.on('ready', createWindow);


