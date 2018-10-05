import React, { Component } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import fire from "./config/fire";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import * as routes from "./config/routes";
import TestCreator from "./components/TestCreator/TestCreator";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path={routes.LANDING} exact component={LandingPage} />
            <Route path={routes.DASHBOARD} exact component={AdminDashboard} />
            <Route path={routes.TEST_EDITOR} exact component={TestCreator} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
