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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }
  }

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
      .then(() => {
        let user = fire.auth().currentUser;
        this.props.loginUser(user.uid);
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
);
