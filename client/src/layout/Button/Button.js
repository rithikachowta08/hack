import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <button
      title={props.title}
      name={props.name}
      id={props.id}
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
