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
}

export interface Page {
  miniapp: Miniapp,
  params?: Map<string, any>,
  state?: PageState
}

export interface NavigatorState {
  pages: Page[]
}

export interface ManagingLocation {
  id: string,
  name: string,
  address: string,
}

export interface UserState {
  activeUser: string
  privilegeList: any
  managingLocations: ManagingLocation[],
  defaultManagingLocation: ManagingLocation,
}
