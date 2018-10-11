import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import fire from "../../config/fire";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import "./Login.css";
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

  // handle input field change

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // call fire.auth to validate email/password, call server.js endpoint to get jwt and get route to dashboard

  login = e => {
    e.preventDefault();
    var code = e.keyCode || e.which;
    if (code && code !== 13) {
      return;
    }
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        fire
          .auth()
          .currentUser.getIdToken()
          .then(userId => {
            this.props.loginUser(userId);
            this.props.history.push("/dashboard");
          });
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
            Login
            <i
              className="fa fa-times-circle"
              onClick={() => this.props.closeFunc("displayCreateModal")}
            />
          </h2>
          <Input
            value={this.state.email}
            change={this.handleChange}
            name="email"
            placeholder="Email"
          />

          <Input
            value={this.state.password}
            change={this.handleChange}
            name="password"
            type="password"
            placeholder="Password"
            onKeyUp={this.login}
          />

          <Button click={this.login}>Submit</Button>
        </div>
      </div>
    );
  }
}

// request to api from react

// const data = {
//   clientId: "eaf5d02e0106c43d533594b300366743",
//   clientSecret:
//     "6faab0531e48a67cedc676a7baeb1bfae1e30f8abdd8510c593a94a97c6fceeb",
//   script: "print('hello')",
//   language: "python3",
//   versionIndex: "0"
// };
// axios
//   .post("https://api.jdoodle.com/execute", data)
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
);
