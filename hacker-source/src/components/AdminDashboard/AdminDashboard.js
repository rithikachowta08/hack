import React, { Component } from "react";
import fire from "../../config/fire";
import Header from "../../layout/Header/Header";
import "./AdminDashboard.css";

class AdminDashboard extends Component {
  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <div>
        <Header logout={this.logout} />
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    );
  }
}

export default AdminDashboard;
