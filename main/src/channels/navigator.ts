import { MethodChannel, ObjAnyType, ObjStringType } from './channel'
import { ipcMain, BrowserWindow, remote } from 'electron';
import { mainWindowId } from '../index';

export default class NavigatorChannel implements MethodChannel {
    id: string
    constructor(id: string) {
        this.id = id
    }
    call(method: string, params: ObjAnyType): Promise<ObjAnyType> {

        let curwin = BrowserWindow.getFocusedWindow();

        if (mainWindowId > 0) {
            BrowserWindow.fromId(mainWindowId).webContents.send('navigator', { method: 'open', arg: params });
        }

        return null;
    }

}