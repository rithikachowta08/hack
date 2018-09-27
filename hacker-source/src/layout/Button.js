import React from "react";
const btnStyle = {
  color: "white",
  backgroundColor: "black",
  border: "1px solid white",
  padding: "12px"
  // borderRadius:""
};
const Button = props => {
  return <button style={btnStyle}>{props.children}</button>;
};

export default Button;
