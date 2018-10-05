import React from "react";
import "./ListItem.css";
const ListItem = props => {
  return <li className="list-item">{props.children}</li>;
};

export default ListItem;
