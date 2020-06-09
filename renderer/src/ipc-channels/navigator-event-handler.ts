import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';
import IpcEventHandler from './ipc-event-handler';

import { navigatorPush, navigatorPop } from '../actions/index';
import {
    Page
} from "../store/store";

export default class NavigatorChannel extends IpcEventHandler {

    handleIpcRenderer(dispatch: Dispatch, event: IpcRendererEvent, args: any[]) {
        if (!args || !args[0]) {
            console.log("Error: invalid arguments when handling navigation bar event");
            return;
        }
        this.handleNavigation(dispatch, args[0])
    }

    handleNavigation(dispatch: Dispatch, args: any) {
        let method = args.method;

        // convert json to Map
        let params = new Map<string, any>();
        for (var item in args.arg.params) {
            params.set(item, args.arg.params[item]);
        }

        let mp = args.arg;
        if (!mp.name) {
            mp.name = mp.url;
        }

        if (!mp.moduleClass) {
            let url: string = mp.url
            if (url.startsWith("miniapp")) {
                mp.moduleClass = 'miniapp';
            } else {
                console.log("Error: unknown miniapp type with url: " + url);
            }
        }

        if (method == 'open') {
            let page: Page = {
                miniapp: mp,
                params: params
            }

            dispatch(navigatorPush(page));
        } else if (method == 'close') {
            dispatch(navigatorPop());
        } else {
            console.log("Error: unknown navigator method=" + method)
        }
    }
}