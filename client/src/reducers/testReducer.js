import * as actionTypes from "../actions/types";

const initialState = {
  testList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_TEST_LIST:
      return {
        ...state,
        testList: action.payload
      };

    case actionTypes.CREATE_TEST:
      return {
        ...state,
        newTest: action.payload
      };

    case actionTypes.SET_CURRENT_TEST:
      return {
        ...state,
        currentTest: action.payload
      };

    case actionTypes.FETCH_QUESTION_DETAILS:
      return {
        ...state,
        questionDetails: action.payload
      };

    case actionTypes.RESET_STATE:
      return {
        testList: []
      };
    default:
      return state;
  }
}
