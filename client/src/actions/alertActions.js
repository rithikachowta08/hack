import { SET_ALERT_DETAILS } from "./types";

// Set alert details
export const setAlert = (message, icon) => {
  return {
    type: SET_ALERT_DETAILS,
    payload: { message, icon }
  };
};
