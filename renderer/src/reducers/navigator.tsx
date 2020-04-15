import {
  NAVIGATOR_POP,
  NAVIGATOR_PRESENT,
  NAVIGATOR_PUSH,
  NAVIGATOR_RESET,
  NavigatorActions

} from "../constants/action-types";

import {
  AppState
} from "../store/store";

const initialState: AppState = {
  pages: [],
  presentedPages: []
}

export default function navigatorReducer(state = initialState, action: NavigatorActions): AppState {
  switch(action.type) {
    case NAVIGATOR_POP:

      var pages = state.pages
      if (pages.length > 0) {
        pages.pop()
      }
      return {
        ...state,
        pages: pages
      }
    case NAVIGATOR_PUSH:
      return {
        ...state,
        pages: [...state.pages, action.page]
      }
    case  NAVIGATOR_RESET:
      return {
        ...state,
        pages: [action.page]
      }
    case NAVIGATOR_PRESENT: 
      return {
          ...state,
          presentedPages: [...state.presentedPages, action.page]
      }
    default:
      return state
  }
}