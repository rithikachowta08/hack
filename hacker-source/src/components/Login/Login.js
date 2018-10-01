import React, { Component } from "react";
import fire from "../../config/fire";
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

    // let provider = new fire.auth.GoogleAuthProvider();
    // fire
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then(function(result) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        // console.log(u);
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
            <img
              src="https://cdn1.iconfinder.com/data/icons/customicondesign-mini-lightcolour-png/48/Close.png"
              alt="close-btn"
              onClick={this.props.closeFunc}
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
          />

          <Button click={this.login}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default Login;
