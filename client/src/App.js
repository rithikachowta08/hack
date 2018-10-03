import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import fire from "./config/fire";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {this.state.user ? (
            <AdminDashboard loggedIn="true" userId={this.state.user.uid} />
          ) : (
            <LandingPage />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
