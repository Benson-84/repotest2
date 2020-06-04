import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';
import IpcEventHandler from './ipc-event-handler';

import { userLogout } from '../actions/index';

export default class TokenExpiredChannel extends IpcEventHandler {
    handleIpcRenderer(dispatch: Dispatch, event: IpcRendererEvent, args: any[]) {
        dispatch(userLogout())
    }
}