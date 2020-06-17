import {
  NAVIGATOR_POP,
  NAVIGATOR_PRESENT,
  NAVIGATOR_PUSH,
  NAVIGATOR_RESET,
  NAVIGATOR_SET_PAGE_TITLE,
  NAVIGATOR_LOADING_ANIMATION_START,
  NAVIGATOR_LOADING_ANIMATION_STOP,
  NAVIGATOR_SUBMITTIN_ANIMATION_START,
  NAVIGATOR_SUBMITTIN_ANIMATION_STOP,
  NavigatorActions

} from "../constants/action-types";

import {
  NavigatorState,
  PageLoadingStatus,
  Page,
} from "../store/store";

const initialState: NavigatorState = {
  pages: []
}

export default function navigatorReducer(state = initialState, action: NavigatorActions): NavigatorState {
  switch (action.type) {
    case NAVIGATOR_POP:

      var pages = state.pages
      if (pages.length > 1) {
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
    case NAVIGATOR_RESET:
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
        state.pages = state.pages.map<Page>((value: Page, index: number) => {
          value.state = {
            ...value.state,
            pageLoadingStatus: index == state.pages.length - 1 ? PageLoadingStatus.started : PageLoadingStatus.idle
          };
          return value;
        })
      }

      return { ...state }
    case NAVIGATOR_LOADING_ANIMATION_STOP:
      if (state.pages && state.pages.length > 0) {
        state.pages = state.pages.map<Page>((value: Page, index: number) => {
          value.state = {
            ...value.state,
            pageLoadingStatus: index == state.pages.length - 1 ? PageLoadingStatus.stopped : PageLoadingStatus.idle
          };
          return value;
        })
      }

      return { ...state }
    case NAVIGATOR_SUBMITTIN_ANIMATION_START:
      if (state.pages && state.pages.length > 0) {
        state.pages = state.pages.map<Page>((value: Page, index: number) => {
          value.state = {
            ...value.state,
            submitting: index == state.pages.length - 1 ? true : false
          };
          return value;
        })
      }

      return { ...state }
    case NAVIGATOR_SUBMITTIN_ANIMATION_STOP:
      if (state.pages && state.pages.length > 0) {
        state.pages = state.pages.map<Page>((value: Page, index: number) => {
          value.state = {
            ...value.state,
            submitting: false
          };
          return value;
        })
      }

      return { ...state }
    default:
      return state
  }
}