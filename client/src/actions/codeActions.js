import * as actionTypes from "./types";

// set currently written code in code editor
export const setCode = code => {
  return {
    type: actionTypes.SET_CURRENT_CODE,
    payload: code
  };
};

// set wuestion being attempted currently
export const setCurQuestion = question => {
  return {
    type: actionTypes.SET_CURRENT_QUESTION,
    payload: question
  };
};
