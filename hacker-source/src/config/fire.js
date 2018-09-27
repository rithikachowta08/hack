import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCJTN3T70KXisG0On6W44uBjsqQmz-YWJA",
  authDomain: "hackerrank-clone.firebaseapp.com",
  databaseURL: "https://hackerrank-clone.firebaseio.com",
  projectId: "hackerrank-clone",
  storageBucket: "hackerrank-clone.appspot.com",
  messagingSenderId: "858602915236"
};
const fire = firebase.initializeApp(config);
export default fire;
