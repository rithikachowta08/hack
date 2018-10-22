import * as actionTypes from "./types";
import { db } from "../config/fire";
import "firebase/firestore";

// get list of tests from database to display in dashboard -- async function

export const fetchTests = () => dispatch => {
  let arr = [];
  db.collection("tests")
    .get()

    .then(querySnapshot => {
      if (querySnapshot.docs.length === 0) arr = "nodata";
      else {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          arr.push({
            id: doc.id,
            name: data.name,
            status: data.status,
            duration: data.duration,
            profile: data.profile,
            date: data.date,
            questions: data.questions
          });
        });
        dispatch({
          type: actionTypes.FETCH_TEST_LIST,
          payload: arr
        });
      }
    });
};

// add newly created test to store

export const addNewTest = (tName, tid) => {
  return {
    type: actionTypes.CREATE_TEST,
    payload: { name: tName, id: tid }
  };
};

// update current test being answered

export const setCurTest = (tid, tName) => {
  return {
    type: actionTypes.SET_CURRENT_TEST,
    payload: { id: tid, name: tName }
  };
};

// add details of all questions to store

export const fetchQuestionDetails = arr => {
  return {
    type: actionTypes.FETCH_QUESTION_DETAILS,
    payload: arr
  };
};
