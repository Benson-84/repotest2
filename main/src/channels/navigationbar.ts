import { MethodChannel, ObjAnyType } from './channel';
import { BrowserWindow } from 'electron';
import { mainWindowId } from '../index';

export default class NavigationChannel implements MethodChannel {
    id: string
    constructor(id:string) {
        this.id = id
    }
    call(method: string, params: ObjAnyType): Promise<ObjAnyType> {
        return new Promise((resolve, reject) => {
            let curwin = BrowserWindow.getFocusedWindow();

            if (mainWindowId > 0) {
                BrowserWindow.fromId(mainWindowId).webContents.send('navigation-bar', { method: method, arg: params });
            }
        })
    }
   
}