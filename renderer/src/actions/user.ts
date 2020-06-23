
import {
  UserActions,
  USER_LOGOUT,
  USER_LOGIN,
  USER_UPDATE_PRIVILEGE_LIST,
  USER_UPDATE_MANAGING_LOCATIONS,
  USER_UPDATE_DEFAULT_MANAGING_LOCATION
} from "../constants/action-types";

import { Location } from '@weconnect/tars-foundation';
import { User } from "@weconnect/tars-foundation";

export function userLogout(): UserActions {
  return {
    type: USER_LOGOUT
  }
}

export function userLogin(user: User): UserActions {
  return {
    type:USER_LOGIN,
    user: user
  }
}

export function updatePrivilegeList(privilegeList: any): UserActions {
  return {
    type: USER_UPDATE_PRIVILEGE_LIST,
    privilegeList: privilegeList
  }
}

export function updateManagingLocations(locations: Location[]): UserActions {
  return {
    type: USER_UPDATE_MANAGING_LOCATIONS,
    managingLocations: locations,
  }
}

export function updateDefaultManagingLocation(location: Location): UserActions {
  return {
    type: USER_UPDATE_DEFAULT_MANAGING_LOCATION,
    defaultLocation: location,
  }
}
