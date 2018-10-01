import React, { Component, Fragment } from "react";
import fire, { db } from "../../config/fire";
import "firebase/firestore";
import Header from "../../layout/Header/Header";
import "./AdminDashboard.css";
import FloatingButton from "../../layout/Floating-Button/FloatingButton";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.database = fire.database().ref();
    this.state = {
      tests: []
    };
  }

  logout = () => {
    fire.auth().signOut();
  };

  componentDidMount() {
    console.log(this.props.userId);
    db.collection("tests")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.data().name},${doc.data().status}`);
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Header logout={this.logout} />
        <div className="dashboard-content">
          <ul className="tests-container" />
          {/* {this.state.test===[]?null:} */}
          <FloatingButton />
        </div>
      </Fragment>
    );
  }
}

export default AdminDashboard;

// adding data
// db.collection("users")
//   .add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   })
//   .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//     console.error("Error adding document: ", error);
//   });
