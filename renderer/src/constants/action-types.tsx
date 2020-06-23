import {
  Page,
} from "../store/store";
import {
  Location
} from '@weconnect/tars-foundation';
import {
  User
} from "@weconnect/tars-foundation";

/// Navigator
export const NAVIGATOR_PUSH = "navigator.push"
export const NAVIGATOR_POP = "navigator.pop"
export const NAVIGATOR_RESET = "navigator.reset"
export const NAVIGATOR_PRESENT = "navigator.present"
export const NAVIGATOR_SET_PAGE_TITLE = "navigator.setPageTitle"
export const NAVIGATOR_LOADING_ANIMATION_START = "navigator.startLoadingAnimation"
export const NAVIGATOR_LOADING_ANIMATION_STOP = "navigator.stopLoadingAnimation"
export const NAVIGATOR_SUBMITTIN_ANIMATION_START = "navigator.startSubmittingAnimation"
export const NAVIGATOR_SUBMITTIN_ANIMATION_STOP = "navigator.stopSubmittingAnimation"


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

export interface NavigatorActionStartLoadingAnim {
  type: typeof NAVIGATOR_LOADING_ANIMATION_START
}
export interface NavigatorActionStopLoadingAnim {
  type: typeof NAVIGATOR_LOADING_ANIMATION_STOP
}

export interface NavigatorActionStartSubmittingAnim {
  type: typeof NAVIGATOR_SUBMITTIN_ANIMATION_START
}
export interface NavigatorActionStopSubmittingAnim {
  type: typeof NAVIGATOR_SUBMITTIN_ANIMATION_STOP
}

export type NavigatorActions = NavigatorActionPop
  | NavigatorActionPush
  | NavigatorActionPresent
  | NavigatorActionReset
  | NavigatorActionSetPageTitle
  | NavigatorActionStartLoadingAnim
  | NavigatorActionStopLoadingAnim
  | NavigatorActionStartSubmittingAnim
  | NavigatorActionStopSubmittingAnim


/// User action types
export const USER_LOGIN = "user.login"
export const USER_LOGOUT = "user.logout"
export const USER_UPDATE_PRIVILEGE_LIST = "user.update_privilege_list"
export const USER_UPDATE_MANAGING_LOCATIONS = "user.update_managing_locations"
export const USER_UPDATE_DEFAULT_MANAGING_LOCATION = "user.update_default_managing_location"

export interface UserActionLogin {
  type: typeof USER_LOGIN
  user: User
}

export interface UserActionLogout {
  type: typeof USER_LOGOUT
}

export interface UserActionUpdatePrivilegeList {
  type: typeof USER_UPDATE_PRIVILEGE_LIST,
  privilegeList: any,
}

export interface UserActionUpdateManagingLocations {
  type: typeof USER_UPDATE_MANAGING_LOCATIONS,
  managingLocations: Location[],
}

export interface UserActionUpdateDefaultManagingLocation {
  type: typeof USER_UPDATE_DEFAULT_MANAGING_LOCATION,
  defaultLocation: Location,
}

export type UserActions = UserActionLogin | UserActionLogout | UserActionUpdatePrivilegeList | UserActionUpdateManagingLocations | UserActionUpdateDefaultManagingLocation
