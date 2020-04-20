import {
  NAVIGATOR_PUSH,
  NAVIGATOR_PRESENT,
  NAVIGATOR_POP,
  NAVIGATOR_RESET,
  NavigatorActions,

  UserActions,
  USER_LOGOUT,
  USER_LOGIN
} from "../constants/action-types";

import {
  Page
} from "../store/store";
import { useRef } from "react";


export function navigatorPush(page: Page): NavigatorActions {
  return {
    type: NAVIGATOR_PUSH,
    page: page
  }
}

export function navigatorPop() : NavigatorActions {
  return {
    type: NAVIGATOR_POP
  }
}

export function navigatorReset(page: Page): NavigatorActions {
  return {
    type: NAVIGATOR_RESET,
    page: page
  }
}

export function navigatorPresent(page: Page): NavigatorActions {
  return {
    type: NAVIGATOR_PRESENT,
    page: page
  }
}


export function userLogout(): UserActions {
  return {
    type: USER_LOGOUT
  }
}
export function userLogin(user:string): UserActions {
  return {
    type:USER_LOGIN,
    user:user
  }
}