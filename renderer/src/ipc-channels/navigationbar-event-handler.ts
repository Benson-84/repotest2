import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';
import IpcEventHandler from './ipc-event-handler';

import { setCurrentPageTitle } from '../actions/index';

export default class NavigationBarEventHandler extends IpcEventHandler {

    handleIpcRenderer(dispatch: Dispatch, event: IpcRendererEvent, args: any[]) {
        if (!args || !args[0]) {
            console.log("Error: invalid arguments when handling navigation bar event");
            return;
        }

        switch (args[0].method) {
            case 'setTitle': {
                this.setTitle(dispatch, args[0].arg.title)
                break;
            }
            default:
                console.log("handling navigation bar event, unknown method: " + args[0].method)
        }
    }

    setTitle(dispatch: Dispatch, title: string) {
        dispatch(setCurrentPageTitle(title));
    }
}