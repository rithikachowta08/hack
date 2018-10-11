import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import { logout } from "../../config/functions";
import Button from "../../layout/Button/Button";
import Timer from "../../layout/Timer/Timer";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { connect } from "react-redux";
import QuestionDetails from "../../components/QuestionDetails/QuestionDetails";
import { withRouter } from "react-router-dom";
import { fetchTests } from "../../actions/testActions";
import "./AnswerTest.css";

class AnswerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      language: "c_cpp",
      questionDescriptions: [],
      highlightedQuestion: ""
    };
    this.getDetails.bind(this);
  }

  // update testname, questionlist and question details to state when it is received in props

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ques !== prevState.ques) {
      let tempState = {
        ...prevState,
        q: nextProps.ques,
        testName: nextProps.curTest[1],
        questionDescriptions: nextProps.questions,
        highlightedQuestion: prevState.highlightedQuestion // was accidentally overwriting with data from props
          ? prevState.highlightedQuestion
          : nextProps.ques[0].name
      };
      return tempState;
    } else return prevState;
  }

  // takes input as template string. prepares data to deliver to api

  preprocessCode = code => {
    code = code.replace(/(\".*)\n(.*\")/g, "$1\\\\n$2"); //escape new line characters
    code = code.replace(/\n/g, "\\n"); //replace line breaks with \n
    code = code.replace(/\s+/g, " ").trim(); // trim white spaces
    code = code.replace(/"/g, '\\"'); // escape double quotes
    console.log(code);
  };

  // change language
  setLanguage = e => {
    let index = e.target.selectedIndex;
    this.setState({ language: `${e.target[index].value}` });
  };

  // get question details
  getDetails = e => {
    this.setState({ highlightedQuestion: e.target.innerText });
  };

  render() {
    // render questions list
    let questions =
      this.state.q.length !== 0
        ? this.state.q.map((question, index) => {
            return (
              <li
                className="question"
                key={index}
                onClick={e => {
                  this.getDetails(e);
                }}
              >
                {question.name}
              </li>
            );
          })
        : null;

    // render details of highlighted question
    let currentQuestion =
      this.state.questionDescriptions.length !== 0 ? (
        <QuestionDetails qname={this.state.highlightedQuestion} />
      ) : null;

    // render current test name
    let testName = this.state.testName ? this.state.testName : null;

    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            <p className="flex-item">{testName}</p>
            <Timer className="flex-item" />
            <p className="flex-item"> Candidate name</p>
            <Button className="flex-item">Submit all and finish</Button>
          </div>
          <div className="overlay">
            <aside className="test-questions">
              <h3 style={{ fontSize: "2em" }}>Questions</h3>
              <ul>{questions}</ul>
            </aside>
            {currentQuestion}
            <div className="middle-section">
              <select name="languageSelector" onChange={this.setLanguage}>
                <option value="c_cpp">C</option>
                <option value="c_cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
              <CodeEditor language={this.state.language} />
              <br />
              <Button>Run</Button>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ques: state.tests.testQuestions,
  curTest: state.tests.newTest,
  questions: state.tests.questionDetails
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchTests }
  )(AnswerTest)
);
