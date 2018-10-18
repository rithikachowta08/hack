import React from "react";

const style = {
  position: "fixed",
  textAlign: "center",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "3",
  padding: "10px 30px",
  backgroundColor: "var(--accent-color)",
  color: "white",
  borderRadius: "2px",
  transition: "all 2s ease-in-out"
};

const Alert = props => {
  return (
    <div style={style}>
      {props.message}
      {props.icon ? (
        <img
          src={props.icon}
          style={{ marginLeft: "10px", width: "24px", height: "24px" }}
          alt="icon not found"
        />
      ) : null}
    </div>
  );
};

export default Alert;
