import React, { Component } from "react";
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

  displayModal = modalName => {
    // console.log(modalName);
    this.setState({
      [modalName]: true
    });
  };

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
      <div className="landing-page-container">
        <Header loggedIn="false" />
        <div className="landing-page-content">
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
          <Button click={this.displayModal} param="displayLogin">
            Login
          </Button>
          <Button click={this.displayModal} param="displaySignup">
            Signup
          </Button>
        </div>
        {this.state.displayLogin ? <Login closeFunc={this.removeModal} /> : ""}
        {this.state.displaySignup ? (
          <Signup closeFunc={this.removeModal} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default LandingPage;
