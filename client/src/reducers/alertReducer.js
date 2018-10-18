import * as actionTypes from "../actions/types";

const initialState = {
  alert: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ALERT_DETAILS:
      return {
        ...state,
        alert: action.payload
      };
    default:
      return state;
  }
}
