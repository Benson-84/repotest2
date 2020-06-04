import {
  Page
} from "../store/store";


/// Navigator
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


// navigation bar
export const NAVIGATION_BAR_SET_TITLE = "navigationbar.settitle"

export interface NavigationbarSetTitle {
  type: typeof NAVIGATION_BAR_SET_TITLE,
  title: string
}

export type NavigationbarActions = NavigationbarSetTitle


/// User

export const USER_LOGIN = "user.login"
export const USER_LOGOUT = "user.logout"

export interface UserActionLogin {
  type: typeof USER_LOGIN
  user: string
}

export interface UserActionLogout {
  type: typeof USER_LOGOUT
}

export type UserActions = UserActionLogin | UserActionLogout
