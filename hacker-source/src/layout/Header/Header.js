import React from "react";
import Button from "../Button";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>YML.CODE</h1>
      <img src="../../assets/logo.png" alt=""></img>
      <Button>Login</Button>
      <Button>Signup</Button>
    </header>
  );
};

export default Header;
