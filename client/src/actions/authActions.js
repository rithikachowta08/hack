import { SET_CURRENT_USER } from "./types";

// Set logged in user
export const loginUser = (userId, userEmail) => {
  return {
    type: SET_CURRENT_USER,
    payload: { userId, userEmail }
  };
};

// Log user out by resetting redux store
export const logoutUser = () => dispatch => {
  dispatch(loginUser({}));
};
