import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import { logout } from "../../config/functions";
import Button from "../../layout/Button/Button";
import Timer from "../../layout/Timer/Timer";
import Spinner from "../../layout/Spinner/Spinner";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchTests } from "../../actions/testActions";
import "./AnswerTest.css";

class AnswerTest extends Component {
  constructor(props) {
    super(props);
    this.state = { q: [] };
  }

  componentDidMount() {}

  // update tests to ui when it is received in props

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ques !== prevState.ques) {
      return { q: nextProps.ques };
    } else return null;
  }

  render() {
    let questions =
      this.state.q.length !== 0 ? (
        this.state.q.map(function(question, index) {
          return (
            <li className="question" key={index}>
              {question.name}
              <input className="radio-btn" type="radio" name="question" />
            </li>
          );
        })
      ) : (
        <Spinner />
      );

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
              <h3 style={{ fontSize: "2em" }}>Questions</h3>
              <ul>{questions}</ul>
            </aside>
            <CodeEditor />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ques: state.tests.testQuestions
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchTests }
  )(AnswerTest)
);
