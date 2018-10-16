import * as actionTypes from "./types";

export const setCode = code => {
  return {
    type: actionTypes.SET_CURRENT_CODE,
    payload: code
  };
};

export const setCurQuestion = question => {
  return {
    type: actionTypes.SET_CURRENT_QUESTION,
    payload: question
  };
};

export const setCurCandidate = (name, email) => {
  return {
    type: actionTypes.SET_CURRENT_CANDIDATE,
    payload: { name, email }
  };
};
