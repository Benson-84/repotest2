
export interface MiniappGroup {
  id: string,
  label: string,
  name: string,
  icon: string,
  miniapps: Miniapp[]
}

export interface Miniapp {
  id: string,
  label: string,
  name: string,
  // miniapp: string, //////////////////////////////////////////
  url: string
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
