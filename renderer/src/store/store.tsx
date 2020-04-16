
export interface Page {
  miniapp: string
  params: Map<string, any>
}

export interface NavigatorState {
  pages: Page[]
  presentedPages: Page[]
}

export interface UserState {
  activeUser: string
}
