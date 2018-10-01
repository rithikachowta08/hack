import React, { Component } from "react";
import fire from "../../config/fire";
import "../Login/Login.css";
import Button from "../../layout/Button/Button";
import Input from "../../layout/Input/Input";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmedPassword: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signup = e => {
    e.preventDefault();
    var code = e.keyCode || e.which;
    if (code && code !== 13) {
      return;
    }
    if (this.state.password === this.state.confirmedPassword) {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {})
        .then(u => {
          console.log(u);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("Passwords dont match");
      this.setState({
        password: "",
        confirmedPassword: ""
      });
    }
  };

  render() {
    return (
      <div className="modal">
        <div className="wrapper">
          <h2>
            Sign up
            <img
              src="https://cdn1.iconfinder.com/data/icons/customicondesign-mini-lightcolour-png/48/Close.png"
              alt="close-btn"
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

export default Login;
