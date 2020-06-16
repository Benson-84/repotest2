import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';
import IpcEventHandler from './ipc-event-handler';

import { setCurrentPageTitle, startLoadingAnim, stopLoadingAnim, startSubmittingAnim, stopSubmittingAnim } from '../actions/index';

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
            case 'startLoadingAnimation': {
                this.startLoadingAnim(dispatch);
                break;
            }
            case 'stopLoadingAnimation': {
                this.stopLoadingAnim(dispatch);
                break;
            }
            case 'startSubmittingAnimation': {
                this.startSubmittingAnim(dispatch);
                break;
            }
            case 'stopSubmittingAnimation': {
                this.stopSubmittingAnim(dispatch);
                break;
            }
            default:
                console.log("handling navigation bar event, unknown method: " + args[0].method)
        }
    }

    private setTitle(dispatch: Dispatch, title: string) {
        dispatch(setCurrentPageTitle(title));
    }

    private startLoadingAnim(dispatch: Dispatch) {
        dispatch(startLoadingAnim());
    }

    private stopLoadingAnim(dispatch: Dispatch) {
        dispatch(stopLoadingAnim());
    }

    private startSubmittingAnim(dispatch: Dispatch) {
        dispatch(startSubmittingAnim())
    }

    private stopSubmittingAnim(dispatch: Dispatch) {
        dispatch(stopSubmittingAnim())
    }
}