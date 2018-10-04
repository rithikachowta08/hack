import React, { Component } from "react";
import axios from "axios";
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
  }

  // handle input field change
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // set client side cookie
  setCookie = (cname, cvalue, extime) => {
    cvalue = encodeURIComponent(cvalue);
    let expires = "";
    if (extime) {
      const d = new Date();
      d.setTime(d.getTime() + extime * 1000);
      expires = `expires=${d.toGMTString()}`;
    }
    document.cookie = `${cname}=${cvalue};path=/;${expires}`;
  };

  // get cookie by name
  getCookie = cname => {
    const name = `${cname}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return decodeURIComponent(c.substring(name.length, c.length));
      }
    }
    return "";
  };

  // submit button click handler
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
            return axios
              .post("/sessionLogin", { userId })
              .then(response =>
                localStorage.setItem("jwt", response.data.token)
              );
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
            <img
              src="https://cdn1.iconfinder.com/data/icons/customicondesign-mini-lightcolour-png/48/Close.png"
              alt="close-btn"
              onClick={() => this.props.closeFunc("displayLogin")}
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

export default Login;
