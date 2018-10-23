import * as actionTypes from "./types";

// Set logged in user
export const loginUser = (userId, userEmail) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: { userId, userEmail }
  };
};

// Log user out by resetting redux state
// export const logoutUser = () => dispatch => {
//   dispatch(loginUser({}));
// };

// reset redux state on logout
export const resetState = () => {
  localStorage.removeItem("state");
  return {
    type: actionTypes.RESET_STATE,
    payload: {}
  };
};
