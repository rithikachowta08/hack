import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <button
      onClick={() => {
        props.click(props.param);
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
