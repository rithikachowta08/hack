import React from "react";
import "./ListItem.css";
const ListItem = props => {
  return (
    <li className="list-item" style={props.style}>
      {props.children}
    </li>
  );
};

export default ListItem;
