import React, { Component } from "react";
import fire from "../../config/fire";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <div>
        <h1>Welcome to Admin Dashboard</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default AdminDashboard;
