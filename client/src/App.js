import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import fire from "./config/fire";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
// import * as routes from "./config/routes";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

class App extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" exact component={AdminDashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
