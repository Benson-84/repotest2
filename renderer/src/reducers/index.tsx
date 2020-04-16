import { combineReducers } from "redux";
import navigatorReducer  from "./navigator";
import userReducer from "./user";

const rootReducer = combineReducers({
  navigatorReducer,
  userReducer
})

export default rootReducer