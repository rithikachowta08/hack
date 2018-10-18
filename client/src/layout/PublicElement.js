import React, { Fragment } from "react";
import { ADMINID } from "../config/constants";

// element accessible by any logged in user

const PublicElement = props => {
  let admin = ADMINID;

  if (props.userId !== admin) {
    return <Fragment>{props.children}</Fragment>;
  } else return null;
};

export default PublicElement;
