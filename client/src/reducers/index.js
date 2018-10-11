import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import codeReducer from "./codeReducer";

export default combineReducers({
  auth: authReducer,
  tests: testReducer,
  code: codeReducer
});
