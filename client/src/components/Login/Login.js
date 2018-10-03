import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import fire from "../../config/fire";
import "./Login.css";
import Button from "../../layout/Button/Button";
import Input from "../../layout/Input/Input";
import handleChange from "../../config/inputChangeHandler";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

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
    this.setCookie("csrfToken", "test", 7);
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        // console.log(u);
        return fire
          .auth()
          .currentUser.getIdToken()
          .then(idToken => {
            const csrfToken = this.getCookie("csrfToken");
            // window.location.assign("/dashboard");
            // return postIdTokenToSessionLogin(
            //   "http://localhost:4000/sessionLogin",
            //   idToken,
            //   csrfToken
            // );
            const data = {
              idToken: idToken,
              csrfToken: csrfToken
            };
            return axios.post("/sessionLogin", data);
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
            change={handleChange}
            name="email"
            placeholder="Email"
          />

          <Input
            value={this.state.password}
            change={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            onKeyUp={this.login}
          />
          <Button click={this.login}>Submit</Button>
          {/* <Route path="/dashboard" exact component={AdminDashboard} /> */}
        </div>
      </div>
    );
  }
}

export default Login;
