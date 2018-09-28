import React from "react";
const inputStyle = {
  display: "block",
  margin: "0 auto",
  width: "40%",
  padding: "10px",
  borderRadius: "2px",
  marginBottom: "2%"
};

const Input = props => {
  return (
    <input
      style={inputStyle}
      value={props.value}
      type="text"
      onChange={props.change}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
