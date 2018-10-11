import * as actionTypes from "../actions/types";

const initialState = {
  testList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TEST_LIST:
      return {
        ...state,
        testList: action.payload
      };
    case actionTypes.CREATE_TEST:
      return {
        ...state,
        newTest: [action.payload.id, action.payload.name]
      };

    case actionTypes.ADD_QUESTIONS:
      return {
        ...state,
        testQuestions: action.payload
      };

    case actionTypes.ADD_QUESTION_DETAILS:
      return {
        ...state,
        questionDetails: action.payload
      };
    default:
      return state;
  }
}
