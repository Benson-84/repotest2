
import {
  UserActions,
  USER_LOGOUT,
  USER_LOGIN
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
