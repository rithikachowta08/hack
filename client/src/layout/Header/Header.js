import React, { Component } from "react";
import Button from "../Button/Button";
import fire from "../../config/fire";
import { resetState } from "../../actions/authActions";
import { connect } from "react-redux";

import "./Header.css";

class Header extends Component {
  logout = () => {
    fire.auth().signOut();
    this.props.resetState();
  };
  render() {
    return (
      <header className="header">
        <img src="../../../assets/logo.png" alt="logo" />
        <h1>YML.CODE</h1>
        {this.props.userid ? <Button click={this.logout}>Logout</Button> : null}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  userid: state.auth.userName
});

export default connect(
  mapStateToProps,
  { resetState }
)(Header);
