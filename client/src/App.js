import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./config/authToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import * as routes from "./config/routes";
import TestCreator from "./components/TestCreator/TestCreator";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AnswerTest from "./components/AnswerTest/AnswerTest";
import Scores from "./components/Scores/Scores";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  componentDidMount() {
    // this.authListener();
  }

  authListener() {
    // fire.auth().onAuthStateChanged(user => {
    //   this.setState({ user });
    // });
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path={routes.LANDING} exact component={LandingPage} />
              <Route path={routes.DASHBOARD} exact component={AdminDashboard} />
              <Route path={routes.ANSWER_TEST} exact component={AnswerTest} />
              <Route path={routes.TEST_EDITOR} exact component={TestCreator} />
              <Route path={routes.TEST_SCORES} exact component={Scores} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
