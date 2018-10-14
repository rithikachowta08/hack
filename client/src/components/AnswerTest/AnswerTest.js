import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import { logout } from "../../config/functions";
import Button from "../../layout/Button/Button";
import Timer from "../../layout/Timer/Timer";
import axios from "axios";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { connect } from "react-redux";
import QuestionDetails from "../../components/QuestionDetails/QuestionDetails";
import { withRouter } from "react-router-dom";
import "./AnswerTest.css";

class AnswerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "c_cpp",
      highlightedQuestion: ""
    };
  }

  // update testname, questionlist and question details to state when it is received in props

  static getDerivedStateFromProps(nextProps, prevState) {
    let questionList;
    nextProps.testDetails.map(test => {
      if (test.id === nextProps.curTest.id) {
        questionList = test.questions;
      }
    });

    if (prevState.questions !== questionList) {
      let tempState = {
        ...prevState,
        questions: questionList,
        testName: nextProps.curTest.name,
        testId: nextProps.curTest.id,
        questionDetails: nextProps.questionDetails,
        highlightedQuestion: prevState.highlightedQuestion // was accidentally overwriting with data from props
          ? prevState.highlightedQuestion
          : questionList[0].name
      };
      return tempState;
    } else {
      return prevState;
    }
  }

  // change language
  setLanguage = e => {
    let index = e.target.selectedIndex;
    this.setState({ language: `${e.target[index].value}` });
  };

  // get question details
  getDetails = e => {
    this.setState({ highlightedQuestion: e.target.innerText });
  };

  // get language code to send to api
  getLanguageCode = language => {
    switch (language) {
      case "c_cpp":
        return "c";
      case "python":
        return "python3";
      case "javascript":
        return "nodejs";
      default:
        return language;
    }
  };

  runCode = () => {
    let sampleInput, sampleOutput;
    this.state.questions.map(question => {
      if (question.name === this.state.highlightedQuestion) {
        sampleInput = question.sampleInput;
        sampleOutput = question.sampleOutput;
      }
    });

    let languageCode = this.getLanguageCode(this.state.language);
    console.log(this.props.code);
    let data = {
      code: this.props.code,
      language: languageCode,
      sampleInput
    };
    axios
      .post("/api/run", data)
      .then(res => {
        console.log(res);
        if (sampleOutput === res.output) console.log("Right!");
        else console.log("Wrong!");
      })
      .catch(err => console.log(err));
  };

  render() {
    let questions =
      this.state.questions.length !== 0
        ? this.state.questions.map(item => {
            return (
              <li
                className="question"
                key={item.id}
                onClick={e => {
                  this.getDetails(e);
                }}
              >
                {item.name}
              </li>
            );
          })
        : null;

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
            <QuestionDetails qname={this.state.highlightedQuestion} />

            <div className="middle-section">
              <select name="languageSelector" onChange={this.setLanguage}>
                <option value="c_cpp">C</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript/NodeJS</option>
                <option value="php">PHP</option>
                <option value="python">Python</option>
              </select>
              <CodeEditor language={this.state.language} />
              <br />
              <Button click={this.runCode}>Run</Button>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  curTest: state.tests.currentTest,
  questionDetails: state.tests.questionDetails,
  code: state.code.currentCode,
  testDetails: state.tests.testList
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AnswerTest)
);
