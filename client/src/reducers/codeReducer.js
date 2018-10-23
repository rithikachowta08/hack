import * as actionTypes from "../actions/types";

const initialState = {
  currentCode: "",
  curQuestionInfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CODE:
      return {
        ...state,
        currentCode: action.payload
      };

    case actionTypes.SET_CURRENT_QUESTION:
      return {
        ...state,
        curQuestionInfo: action.payload
      };

    case actionTypes.RESET_STATE:
      return {
        currentCode: "",
        curQuestionInfo: {}
      };
    default:
      return state;
  }
}
