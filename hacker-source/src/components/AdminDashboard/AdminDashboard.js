import React, { Component, Fragment } from "react";
import fire from "../../config/fire";
import Header from "../../layout/Header/Header";
import "./AdminDashboard.css";

class AdminDashboard extends Component {
  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <Fragment>
        <Header logout={this.logout} />
        <div className="dashboard-content">
          <h1 className="welcome">Welcome to Admin Dashboard</h1>
        </div>
      </Fragment>
    );
  }
}

export default AdminDashboard;
