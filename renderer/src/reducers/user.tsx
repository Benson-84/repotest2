
import {
  UserState
} from "../store/store";
import { 
  UserActions, USER_LOGIN, USER_LOGOUT 
} from "../constants/action-types";

const initialState: UserState = {
  activeUser: null
}

export default function userReducer(state = initialState, action: UserActions): UserState {
  console.log(action);
  
  switch(action.type) {
    case USER_LOGIN:
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
