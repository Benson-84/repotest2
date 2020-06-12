
import {
  UserActions,
  USER_LOGOUT,
  USER_LOGIN,
  USER_UPDATE_PRIVILEGE_LIST,
  USER_UPDATE_MANAGING_LOCATIONS,
  USER_UPDATE_DEFAULT_MANAGING_LOCATION
} from "../constants/action-types";

import { ManagingLocation } from '../store/store';

export function userLogout(): UserActions {
  return {
    type: USER_LOGOUT
  }
}

export function userLogin(email:string, accessToken: string, refreshToken: string): UserActions {
  return {
    type:USER_LOGIN,
    email:email,
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

export function updatePrivilegeList(privilegeList: any): UserActions {
  return {
    type: USER_UPDATE_PRIVILEGE_LIST,
    privilegeList: privilegeList
  }
}

export function updateManagingLocations(locations: ManagingLocation[]): UserActions {
  return {
    type: USER_UPDATE_MANAGING_LOCATIONS,
    managingLocations: locations,
  }
}

export function updateDefaultManagingLocation(location: ManagingLocation): UserActions {
  return {
    type: USER_UPDATE_DEFAULT_MANAGING_LOCATION,
    defaultLocation: location,
  }
}
