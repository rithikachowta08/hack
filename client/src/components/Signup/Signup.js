import React, { Component } from "react";
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

  //render signup modal
  render() {
    let iconStyle = {
      top: "-20px"
    };
    return (
      <div className="modal">
        <div className="wrapper">
          <h2>
            Sign up
            <i
              style={iconStyle}
              className="fa fa-times-circle"
              onClick={() => this.props.closeFunc("displayCreateModal")}
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

export default Signup;
