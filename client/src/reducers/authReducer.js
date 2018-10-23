import * as actionTypes from "../actions/types";
import { isEmpty } from "../config/functions";

const initialState = {
  isAuthenticated: false,
  user: null,
  userName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload.userId,
        userName: action.payload.userEmail
      };
    case actionTypes.RESET_STATE:
      return {
        isAuthenticated: false,
        user: null,
        userName: null
      };
    default:
      return state;
  }
}
