import {
  NAVIGATOR_POP,
  NAVIGATOR_PRESENT,
  NAVIGATOR_PUSH,
  NAVIGATOR_RESET,
  NAVIGATOR_SET_PAGE_TITLE,
  NAVIGATOR_LOADING_ANIMATION_START,
  NAVIGATOR_LOADING_ANIMATION_STOP,
  NavigatorActions

} from "../constants/action-types";

import {
  NavigatorState,
  PageLoadingStatus
} from "../store/store";

const initialState: NavigatorState = {
  pages: []
}

export default function navigatorReducer(state = initialState, action: NavigatorActions): NavigatorState {
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
          pages: [...state.pages, action.page]
      }
    case NAVIGATOR_SET_PAGE_TITLE:
      if (state.pages && state.pages.length > 0) {
        state.pages[state.pages.length - 1].state = {
          ...state.pages[state.pages.length - 1].state,
          title: action.title
        };
      }

      return { ...state }

  case NAVIGATOR_LOADING_ANIMATION_START:
    if (state.pages && state.pages.length > 0) {
      state.pages[state.pages.length - 1].state = {
        ...state.pages[state.pages.length - 1].state,
        pageLoadingStatus: PageLoadingStatus.started
      };
    }

    return { ...state }

  case NAVIGATOR_LOADING_ANIMATION_STOP:
    if (state.pages && state.pages.length > 0) {
      state.pages[state.pages.length - 1].state = {
        ...state.pages[state.pages.length - 1].state,
        pageLoadingStatus: PageLoadingStatus.stopped
      };
    }

    return { ...state }

    default:
      return state
  }
}