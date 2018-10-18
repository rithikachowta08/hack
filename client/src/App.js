import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./config/PrivateRoute";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import * as routes from "./config/constants";
import TestCreator from "./components/TestCreator/TestCreator";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AnswerTest from "./components/AnswerTest/AnswerTest";
import Scores from "./components/Scores/Scores";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path={routes.LANDING} exact component={LandingPage} />
              <PrivateRoute
                path={routes.DASHBOARD}
                exact
                component={AdminDashboard}
              />
              <PrivateRoute
                path={routes.ANSWER_TEST}
                exact
                component={AnswerTest}
              />
              <PrivateRoute
                path={routes.TEST_EDITOR}
                exact
                component={TestCreator}
              />
              <PrivateRoute
                path={routes.TEST_SCORES}
                exact
                component={Scores}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
