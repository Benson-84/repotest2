import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';
import IpcEventHandler from './ipc-event-handler';

import { navigatorPush, navigatorPop, userLogin } from '../actions/index';
import {
    Page
} from "../store/store";

export default class NavigatorChannel extends IpcEventHandler {

    handleIpcRenderer(dsp: Dispatch, event: IpcRendererEvent, args: any[]) {
        if (args[0].arg.url == 'desktop-home') {
            console.log('UserLogin')
            dsp(userLogin('xxx'))
        } else {
            this.handleNavigation(dsp, args[0])
        }
    }

    handleNavigation(dsp: Dispatch, args: any) {
        let method = args.method;

        // convert json to Map
        let params = new Map<string, any>();
        for (var item in args.arg.params) {
            params.set(item, args.arg.params[item]);
        }

        if (method == 'open') {
            let page: Page = {
                miniapp: args.arg,
                params: params
            }

            dsp(navigatorPush(page));
        } else if (method == 'close') {
            dsp(navigatorPop());
        } else {
            console.log("Error: unknown navigator method=" + method)
        }
    }
}