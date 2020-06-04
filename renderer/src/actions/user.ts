
import {
  UserActions,
  USER_LOGOUT,
  USER_LOGIN
} from "../constants/action-types";
import { ThunkAction } from "redux-thunk";

export function userLogout(): UserActions {
  return {
    type: USER_LOGOUT
  }
}

export function userLogin(email:string): UserActions {
  return {
    type:USER_LOGIN,
    email:email,
    isRequesting: true
  }

}
