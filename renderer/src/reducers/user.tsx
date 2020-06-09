
import {
  UserState
} from "../store/store";
import { 
  UserActions, USER_LOGIN, USER_LOGOUT 
} from "../constants/action-types";
const ipc = require('electron').ipcRenderer;

const initialState: UserState = {
  activeUser: null
}

export default function userReducer(state = initialState, action: UserActions): UserState {
  
  switch(action.type) {
    case USER_LOGIN:
      ipc.send("user-session-login", {"accessToken": action.accessToken, "refreshToken": action.refreshToken});
      return {
        activeUser:action.email
      }
    case USER_LOGOUT:
      return {
        activeUser:null
      }
    default:
      return state
  }
}
