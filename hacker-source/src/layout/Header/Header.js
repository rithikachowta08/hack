import React from "react";
import Button from "../Button/Button";
import "./Header.css";

const Header = props => {
  return (
    <header className="header">
      <img src="../../../assets/logo.png" alt="logo" />
      <h1>YML.CODE</h1>
      {props.logout ? <Button click={props.logout}>Logout</Button> : null}
    </header>
  );
};

export default Header;
