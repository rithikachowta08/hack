import React, { Component, Fragment } from "react";
import fire from "../../config/fire";
import "firebase/firestore";
import Header from "../../layout/Header/Header";
import "./AdminDashboard.css";
import FloatingButton from "../../layout/Floating-Button/FloatingButton";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.database = fire.database();
    this.state = {
      tests: []
    };
  }

  logout = () => {
    fire.auth().signOut();
  };

  componentDidMount() {
    console.log(this.props.userId);
    this.database
      .ref("/users/" + this.props.userId + "/tests")
      .once("value")
      .then(function(snapshot) {
        console.log(snapshot);
        // ...
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
