import * as actionTypes from "./types";
import { db } from "../config/fire";
import "firebase/firestore";

// get list of tests from database to display in dashboard -- async function

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
      dispatch({
        type: actionTypes.SET_TEST_LIST,
        payload: arr
      });
    });
};

// add newly created test to store

export const addNewTest = (tName, tid) => {
  return {
    type: actionTypes.CREATE_TEST,
    payload: { name: tName, id: tid }
  };
};

// add questions of newly created test to store

function asyncAction(questionId) {
  return new Promise(function(resolve, reject) {
    db.collection("questions")
      .doc(questionId)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data());
        return resolve(querySnapshot.data());
      })
      .catch(err => reject(err));
  });
}

export const addQuestions = arr => dispatch => {
  var promises = [];
  for (let i in arr) {
    promises.push(asyncAction(arr[i]));
  }

  Promise.all(promises).then(
    function AcceptHandler(results) {
      console.log(results);
      dispatch({
        type: actionTypes.ADD_QUESTIONS,
        payload: results
      });
    },
    function ErrorHandler(error) {
      console.log(error);
    }
  );
};
