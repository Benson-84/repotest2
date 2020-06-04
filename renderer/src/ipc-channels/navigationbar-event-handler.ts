import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';
import IpcEventHandler from './ipc-event-handler';

import { setTitle } from '../actions/index';

export default class NavigationBarEventHandler extends IpcEventHandler {

    handleIpcRenderer(dsp: Dispatch, event: IpcRendererEvent, args: any[]) {
        console.log("settitle")
        // dsp(setTitle())

    }
}