import React, { Fragment } from "react";
import { ADMINID } from "../config/constants";

const AdminElement = props => {
  let admin = ADMINID;
  if (props.userId === admin) {
    return <Fragment>{props.children}</Fragment>;
  } else return null;
};

export default AdminElement;
