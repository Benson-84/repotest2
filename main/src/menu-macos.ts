import { app } from "electron"
import { setWeWorkServer } from "./channels/network";
import { reload } from "./index";

export function createMacMenu(
  window: Electron.BrowserWindow,
): Electron.MenuItemConstructorOptions[] {
  const name: string = app.getName()

  const appMenu: Electron.MenuItemConstructorOptions = {
    label: name,
    submenu: [
      { label: "Reload", accelerator: "Command+R" , role: 'forceReload'},
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q" , role: 'quit'},
    ],
  }

  const accountMenu: Electron.MenuItemConstructorOptions = {
    label: "Account",
    submenu: [
    ]
  }


  const developerMenu: Electron.MenuItemConstructorOptions = {
    label: "Developer",
    submenu: [
      {type: "separator" },
      {label: 'staging', type: 'radio', click: handleSelectStagingServer, checked: true},
      {label: 'production', type: 'radio', click: handleSelectProductionServer},
      {type: "separator" },
      {label: 'Dev Tools', accelerator: 'Command+Option+I', role: 'toggleDevTools'},
    ]
  }

  const helpMenu: Electron.MenuItemConstructorOptions = {
    label: "Help",
    submenu: [
    ]
  }

  return [appMenu, accountMenu, developerMenu, helpMenu]
}

function handleSelectStagingServer() {
  setWeWorkServer("staging");
  reload("staging");
}

function handleSelectProductionServer() {
  setWeWorkServer("production");
  reload("production");
}