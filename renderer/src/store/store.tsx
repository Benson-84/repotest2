
export interface Page {
  miniapp: string
  url: string
  moduleClass: string
  params: Map<string, any>
}

export interface NavigatorState {
  pages: Page[]
  presentedPages: Page[]
}

export interface UserState {
  activeUser: string
}
