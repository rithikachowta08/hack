import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import codeReducer from "./codeReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  auth: authReducer,
  tests: testReducer,
  code: codeReducer,
  alert: alertReducer
});
