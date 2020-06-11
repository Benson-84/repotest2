import { ipcRenderer, IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';

import IpcEventHandler from './ipc-event-handler';
import TokenExpiredEventHandler from "./token-expierd-event-handler";
import NavigatorEventHandler from "./navigator-event-handler";
import NavigationBarEventHandler from "./navigationbar-event-handler";

interface HandlerPair {
    name: string,
    handler: IpcEventHandler
}

const IPC_RENDERER_EVENT_CHANNELS: HandlerPair[] = [
    { name: "tokenExprired", handler: new TokenExpiredEventHandler() },
    { name: "navigator", handler: new NavigatorEventHandler() },
    { name: "navigation-bar", handler: new NavigationBarEventHandler() },
]

export default class IpcEventrListener {
    dispatch: Dispatch;

    constructor(dsp: Dispatch) {
        this.dispatch = dsp;
    }

    attach() {
        IPC_RENDERER_EVENT_CHANNELS.forEach((item: HandlerPair) => {
            let channel = item;
            ipcRenderer.on(channel.name, (event: IpcRendererEvent, ...args: any[]) => {
                console.log("received IpcRendererEvent: " + JSON.stringify(event) + ", with args: " + JSON.stringify(args));
                args.forEach((arg: any) => {
                    console.log("arg: " + JSON.stringify(arg))
                })

                channel.handler.handleIpcRenderer(this.dispatch, event, args);
            })
        })
    }

    detach() {
        IPC_RENDERER_EVENT_CHANNELS.forEach((item) => {
            let channel = item;
            ipcRenderer.removeAllListeners(channel.name);
        })
    }
}