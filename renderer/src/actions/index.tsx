import {
  NAVIGATOR_PUSH,
  NAVIGATOR_PRESENT,
  NAVIGATOR_POP,
  NAVIGATOR_RESET,
  NAVIGATOR_SET_PAGE_TITLE,
  NAVIGATOR_LOADING_ANIMATION_START,
  NAVIGATOR_LOADING_ANIMATION_STOP,
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

export function navigatorPop(): NavigatorActions {
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

export function setCurrentPageTitle(title: string): NavigatorActions {
  return {
    type: NAVIGATOR_SET_PAGE_TITLE,
    title: title
  }
}

export function startLoadingAnim(): NavigatorActions {
  return {
    type: NAVIGATOR_LOADING_ANIMATION_START
  }
}

export function stopLoadingAnim(): NavigatorActions {
  return {
    type: NAVIGATOR_LOADING_ANIMATION_STOP
  }
}
