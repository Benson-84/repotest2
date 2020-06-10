export interface Miniapp {
  name: string,
  label: string,
  icon: string,
  url: string,
  moduleClass: string,
  mode?: string
}

export interface PageState {
  title: string
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
  activeUser: string
  privilegeList: any
}
