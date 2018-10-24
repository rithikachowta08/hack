import * as actionTypes from "./types";

// Set logged in user
export const loginUser = (userId, userEmail, userProfile) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: { userId, userEmail, userProfile }
  };
};

// reset redux state on logout
export const resetState = () => {
  localStorage.removeItem("state");
  return {
    type: actionTypes.RESET_STATE,
    payload: {}
  };
};
