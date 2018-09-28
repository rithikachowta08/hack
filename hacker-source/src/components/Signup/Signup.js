import React, { Component } from "react";
import fire from "../../config/fire";
import "./Signup.css";
import Button from "../../layout/Button/Button";
import Input from "../../layout/Input/Input";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signup = e => {
    e.preventDefault();
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
              onClick={this.props.closeFunc}
            />
          </h2>
          <Input
            value={this.state.email}
            change={this.handleChange}
            placeholder="Email"
          />

          <Input
            value={this.state.password}
            change={this.handleChange}
            placeholder="Password"
          />
          <Input
            value={this.state.password}
            change={this.handleChange}
            placeholder="Confirm password"
          />
          <Button>Submit</Button>
        </div>
      </div>
    );
  }
}

export default Login;
