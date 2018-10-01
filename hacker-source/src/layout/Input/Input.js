import React from "react";
import "./Input.css";

const Input = props => {
  return (
    <input
      name={props.name}
      value={props.value}
      type={props.type}
      onChange={props.change}
      placeholder={props.placeholder}
      onKeyUp={props.onKeyUp}
      onFocus={e => (e.target.placeholder = "")}
      onBlur={e => (e.target.placeholder = props.placeholder)}
    />
  );
};

export default Input;
