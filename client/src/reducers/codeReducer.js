import * as actionTypes from "../actions/types";

const initialState = {
  currentCode: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CODE:
      return {
        ...state,
        currentCode: action.payload
      };
    default:
      return state;
  }
}
