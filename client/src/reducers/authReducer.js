import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../config/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: null,
  userName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload.userId,
        userName: action.payload.userEmail
      };
    default:
      return state;
  }
}
