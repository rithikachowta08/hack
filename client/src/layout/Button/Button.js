import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <button
      title={props.title}
      className={props.class}
      onClick={e => {
        props.click(e);
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
