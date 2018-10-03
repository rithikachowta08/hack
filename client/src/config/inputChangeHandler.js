// handles onchange event for input fields

import React from "react";
const handleChange = e => {
  this.setState({ [e.target.name]: e.target.value });
};

export default handleChange;
