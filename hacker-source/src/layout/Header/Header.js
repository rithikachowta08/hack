import React from "react";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img src="../../../assets/logo.png" alt="logo" />
      <h1>YML.CODE</h1>
      <div className="btn-container">
        <Button>Login</Button>
        <Button>Signup</Button>
      </div>
    </header>
  );
};

export default Header;
