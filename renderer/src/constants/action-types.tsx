import {
  Page
} from "../store/store";


/// Navigator
export const NAVIGATOR_PUSH = "navigator.push"
export const NAVIGATOR_POP = "navigator.pop"
export const NAVIGATOR_RESET = "navigator.reset"
export const NAVIGATOR_PRESENT = "navigator.present"
export const NAVIGATOR_SET_PAGE_TITLE = "navigator.setPageTitle"


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

export interface NavigatorActionSetPageTitle {
  type: typeof NAVIGATOR_SET_PAGE_TITLE
  title: string
}

export type NavigatorActions = NavigatorActionPop
  | NavigatorActionPush
  | NavigatorActionPresent
  | NavigatorActionReset
  | NavigatorActionSetPageTitle
 
/// User action types

export const USER_LOGIN = "user.login"
export const USER_LOGOUT = "user.logout"
export const USER_PRIVILEGE_LIST = "user.privilege_list"

export interface UserActionLogin {
  type: typeof USER_LOGIN
  email: string
  accessToken: string
  refreshToken: string
}

export interface UserActionLogout {
  type: typeof USER_LOGOUT
}

export interface UserActionPrivilegeList {
  type: typeof USER_PRIVILEGE_LIST,
  privilegeList: any,
}

export type UserActions = UserActionLogin | UserActionLogout | UserActionPrivilegeList
