import { IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux';

export default abstract class IpcEventHandler {
    abstract handleIpcRenderer(dispatch: Dispatch, event: IpcRendererEvent, args: any[]): void;
}