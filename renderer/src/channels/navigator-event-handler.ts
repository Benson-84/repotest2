import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';
import IpcEventHandler from './ipc-event-handler';

import { navigatorPush, navigatorPop } from '../actions/index';
import {
    Page, Miniapp
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

        let mp: Miniapp = {
            name: params.get('name'),
            label: params.get('label'),
            icon: params.get('icon'),
            url: args.arg.url,
            moduleClass: params.get('moduleClass'),
            mode: args.arg.mode
        };

        if (!mp.name) {
            mp.name = mp.url;
        }

        if (!mp.moduleClass) {
            if (mp.url.startsWith("miniapp")) {
                mp.moduleClass = 'miniapp';
            } else {
                console.log("Error: unknown miniapp type with url: " + mp.url);
            }
        }

        if (!mp.mode) {
            mp.mode = "push";
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