import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import "./LandingPage.css";
import Button from "../../layout/Button/Button";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false,
      displaySignup: false
    };
  }

  // handle modal display according to state

  displayModal = modalName => {
    this.setState({
      [modalName]: true
    });
  };

  // handle modal hiding according to state
  removeModal = () => {
    let modalName;
    if (this.state.displayLogin) {
      modalName = "displayLogin";
    }

    if (this.state.displaySignup) {
      modalName = "displaySignup";
    }
    this.setState({
      [modalName]: false
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="content-wrapper">
          <h1>Welcome to YML Code Console</h1>
          <div className="features">
            <div className="flex-cell">
              <img src="../../../assets/score.png" alt="score" />
              Automated reliable scoring
            </div>
            <div className="flex-cell">
              <img src="../../../assets/code.png" alt="score" />
              Vast library of programming questions
            </div>
            <div className="flex-cell">
              <img src="../../../assets/people.png" alt="score" />
              Easy candidate management
            </div>
          </div>
          <h2>Get started</h2>
          <Button class="slide" click={this.displayModal} param="displayLogin">
            Login
          </Button>
          <Button click={this.displayModal} class="slide" param="displaySignup">
            Signup
          </Button>
        </div>
        {this.state.displayLogin ? (
          <Login closeFunc={this.removeModal} />
        ) : null}
        {this.state.displaySignup ? (
          <Signup closeFunc={this.removeModal} />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

export default LandingPage;
