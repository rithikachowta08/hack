import * as actionTypes from "./types";
import { db } from "../config/fire";
import "firebase/firestore";

// get list of tests from database -- async function

export const fetchTests = () => dispatch => {
  let arr = [];
  db.collection("tests")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = doc.data();
        arr.push({
          name: data.name,
          status: data.status,
          profile: data.profile,
          date: data.date
        });
      });
      dispatch(setTests(arr));
    });
};

export const setTests = arr => {
  return {
    type: actionTypes.SET_TEST_LIST,
    payload: arr
  };
};

export const addNewTest = (tName, tid) => {
  return {
    type: actionTypes.CREATE_TEST,
    payload: { name: tName, id: tid }
  };
};
