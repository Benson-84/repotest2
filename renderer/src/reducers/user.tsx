
import {
  UserState
} from "../store/store";
import { 
  UserActions, USER_LOGIN, USER_LOGOUT, USER_PRIVILEGE_LIST
} from "../constants/action-types";
const ipc = require('electron').ipcRenderer;

const initialState: UserState = {
  activeUser: null,
  privilegeList: null,
}

export default function userReducer(state = initialState, action: UserActions): UserState {
  
  switch (action.type) {
    case USER_LOGIN:
      ipc.send("user-session-login", { "accessToken": action.accessToken, "refreshToken": action.refreshToken });
      return {
        activeUser: action.email,
        privilegeList: null
      }
    case USER_LOGOUT:
      return {
        activeUser: null,
        privilegeList: null
      }
    case USER_PRIVILEGE_LIST:
      return {
        ...state,
        privilegeList: action.privilegeList
      }
    default:
      return state
  }
}
