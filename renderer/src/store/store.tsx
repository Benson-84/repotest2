import { User } from "@weconnect/tars-foundation";
import { Location } from '@weconnect/tars-foundation';

export interface Miniapp {
  name: string,
  label: string,
  icon: string,
  url: string,
  moduleClass: string,
  mode?: string
}

export enum PageLoadingStatus {
  idle,
  started,
  stopped
}

export interface PageState {
  title: string,
  pageLoadingStatus: PageLoadingStatus,
  submitting: boolean,
}

export interface Page {
  miniapp: Miniapp,
  params?: Map<string, any>,
  state?: PageState
}

export interface NavigatorState {
  pages: Page[]
}

export interface UserState {
  activeUser: User
  privilegeList: any
  managingLocations: Location[],
  defaultManagingLocation: Location,
}
