import {
  Page
} from "../store/store";

export const NAVIGATOR_PUSH = "navigator.push"
export const NAVIGATOR_POP = "navigator.pop"
export const NAVIGATOR_RESET = "navigator.reset"
export const NAVIGATOR_PRESENT = "navigator.present"


export interface NavigatorActionPush {
  type: typeof NAVIGATOR_PUSH
  page: Page
}

export interface NavigatorActionPop {
  type: typeof NAVIGATOR_POP
}

export interface NavigatorActionPresent {
  type: typeof NAVIGATOR_PRESENT
  page: Page
}

export interface NavigatorActionReset {
  type: typeof NAVIGATOR_RESET
  page: Page
}

export type NavigatorActions =  NavigatorActionPop | NavigatorActionPush | NavigatorActionPresent | NavigatorActionReset
