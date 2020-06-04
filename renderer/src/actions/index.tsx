import {
  NAVIGATOR_PUSH,
  NAVIGATOR_PRESENT,
  NAVIGATOR_POP,
  NAVIGATOR_RESET,
  NavigatorActions,
} from "../constants/action-types";

import {
  Page
} from "../store/store";


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

