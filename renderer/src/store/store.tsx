export interface Miniapp {
  name: string,
  label: string,
  icon: string,
  url: string,
  moduleClass: string
}

export interface Page {
  miniapp: Miniapp,
  params: Map<string, any>
}

export interface NavigatorState {
  pages: Page[]
  presentedPages: Page[]
}

export interface UserState {
  activeUser: string
}
