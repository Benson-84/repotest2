
import {
  UserActions,
  USER_LOGOUT,
  USER_LOGIN,
  USER_PRIVILEGE_LIST
} from "../constants/action-types";

export function userLogout(): UserActions {
  return {
    type: USER_LOGOUT
  }
}

export function userLogin(email:string, accessToken: string, refreshToken: string): UserActions {
  return {
    type:USER_LOGIN,
    email:email,
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

export function updatePrivilegeList(privilegeList: any): UserActions {
  return {
    type: USER_PRIVILEGE_LIST,
    privilegeList: privilegeList
  }
}
