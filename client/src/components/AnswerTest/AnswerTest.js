import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import { logout } from "../../config/functions";
import Button from "../../layout/Button/Button";
import ListItem from "../../layout/ListItem/ListItem";
import axios from "axios";

class AnswerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            Test name
            <Button>Submit all and finish</Button>
          </div>
          <div className="overlay">
            <div className="test-questions">
              <p>Questions</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AnswerTest;
