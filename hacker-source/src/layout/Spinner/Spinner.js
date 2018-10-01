import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return <div className="loader" v-if="loader" />;
};

export default Spinner;
