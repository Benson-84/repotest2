
export interface Page {
  miniapp: string
  params: {string: any}
}

export interface AppState {
  pages: Page[]
  presentedPages: Page[]
}