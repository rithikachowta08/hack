import React, { Component, Fragment } from "react";
import Alert from "../../layout/Alert";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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

  removeModal = modalName => {
    this.setState({
      [modalName]: false
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.alert.message ? (
          <Alert
            message={this.props.alert.message}
            icon={this.props.alert.icon}
          />
        ) : null}
        <Header />
        <div className="content-wrapper">
          <div className="inner-wrapper">
            <h1>Welcome to YML Code Console</h1>
            <div className="features">
              <div className="flex-cell">
                <img src="../../../assets/score.png" alt="score" />
                Automated reliable scoring
              </div>
              <div className="flex-cell">
                <img src="../../../assets/code.png" alt="score" />
                Library of challenging programming questions
              </div>
              <div className="flex-cell">
                <img src="../../../assets/people.png" alt="score" />
                Easy candidate management
              </div>
            </div>
            <h2>Get started</h2>
            <Button
              class="slide"
              click={this.displayModal.bind(this, "displayLogin")}
            >
              Login
            </Button>
            <Button
              click={this.displayModal.bind(this, "displaySignup")}
              class="slide"
            >
              Signup
            </Button>
          </div>
        </div>
        {this.state.displayLogin ? (
          <Login closeFunc={this.removeModal} />
        ) : null}
        {this.state.displaySignup ? (
          <Signup closeFunc={this.removeModal} />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert.alert
});

export default withRouter(connect(mapStateToProps)(LandingPage));
