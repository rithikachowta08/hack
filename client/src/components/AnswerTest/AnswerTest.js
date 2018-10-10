import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import { logout } from "../../config/functions";
import Button from "../../layout/Button/Button";
import Timer from "../../layout/Timer/Timer";
import "./AnswerTest.css";

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
            <p className="flex-item">Test name</p>
            <Timer className="flex-item" />
            <p className="flex-item"> Candidate name</p>
            <Button className="flex-item">Submit all and finish</Button>
          </div>
          <div className="overlay">
            <aside className="test-questions">
              <h3>Questions</h3>
            </aside>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AnswerTest;
