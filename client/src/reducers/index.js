import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testReducer from "./testReducer";

export default combineReducers({
  auth: authReducer,
  tests: testReducer
});
