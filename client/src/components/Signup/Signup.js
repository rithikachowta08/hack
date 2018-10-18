import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import fire from "../../config/fire";
import "firebase/auth";
import "../Login/Login.css";
import Button from "../../layout/Button/Button";
import Input from "../../layout/Input/Input";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmedPassword: ""
    };
  }

  // handle input field change
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // submit button click handler
  signup = e => {
    e.preventDefault();
    // trigger submit on enter keystroke
    var code = e.keyCode || e.which;
    if (code && code !== 13) {
      return;
    }
    if (this.state.password === this.state.confirmedPassword) {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          let user = fire.auth().currentUser;
          this.props.loginUser(user.uid, user.email);
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("Passwords dont match");
      this.setState({
        password: "",
        confirmedPassword: ""
      });
    }
  };

  //render signup modal
  render() {
    return (
      <div className="modal">
        <div className="wrapper">
          <h2>
            Sign up
            <i
              className="fa fa-times-circle"
              onClick={() => this.props.closeFunc("displaySignup")}
            />
          </h2>
          <Input
            name="email"
            type="email"
            value={this.state.email}
            change={this.handleChange}
            placeholder="Email"
          />

          <Input
            name="password"
            type="password"
            value={this.state.password}
            change={this.handleChange}
            placeholder="Password"
          />
          <Input
            name="confirmedPassword"
            type="password"
            value={this.state.confirmedPassword}
            change={this.handleChange}
            placeholder="Confirm password"
            onKeyUp={this.signup}
          />
          <Button click={this.signup}>Submit</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Signup)
);
