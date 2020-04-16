
import {
  UserState
} from "../store/store";
import { 
  UserActions, USER_LOGIN, USER_LOGOUT 
} from "../constants/action-types";

const initialState: UserState = {
  activeUser: "xxxx"
}

export default function userReducer(state = initialState, action: UserActions): UserState {
  switch(action.type) {
    case USER_LOGIN:
      return {
        ...state
      }
    case USER_LOGOUT:
      return {
        ...state
      }
    default:
      return state
  }
}