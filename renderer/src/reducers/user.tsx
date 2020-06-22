
import {
  UserState
} from "../store/store";
import {
  UserActions, USER_LOGIN, USER_LOGOUT, USER_UPDATE_PRIVILEGE_LIST, USER_UPDATE_MANAGING_LOCATIONS, USER_UPDATE_DEFAULT_MANAGING_LOCATION
} from "../constants/action-types";

const initialState: UserState = {
  activeUser: null,
  privilegeList: null,
  managingLocations: null,
  defaultManagingLocation: null,
}

export default function userReducer(state = initialState, action: UserActions): UserState {

  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        activeUser: action.user,
        privilegeList: null
      }
    case USER_LOGOUT:
      return {
        ...state,
        activeUser: null,
        privilegeList: null
      }
    case USER_UPDATE_PRIVILEGE_LIST:
      return {
        ...state,
        privilegeList: action.privilegeList
      }
    case USER_UPDATE_MANAGING_LOCATIONS:
      return {
        ...state,
        managingLocations: action.managingLocations
      }
    case USER_UPDATE_DEFAULT_MANAGING_LOCATION:
      return {
        ...state,
        defaultManagingLocation: action.defaultLocation
      }
    default:
      return state
  }
}
