import React, { Component, Fragment } from "react";
import Alert from "../../layout/Alert";
import { setCode } from "../../actions/codeActions";
import { setAlert } from "../../actions/alertActions";

import Header from "../../layout/Header/Header";
import { logout } from "../../config/functions";
import Button from "../../layout/Button/Button";
import Timer from "../../layout/Timer/Timer";
import axios from "axios";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { connect } from "react-redux";
import { db } from "../../config/fire";
import "firebase/firestore";
import QuestionDetails from "../../components/QuestionDetails/QuestionDetails";
import { withRouter } from "react-router-dom";
import "./AnswerTest.css";

class AnswerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "c_cpp",
      highlightedQuestion: "",
      currentScore: 0,
      minutes: 0,
      submitted: false
    };
  }

  // update testname, questionlist and question details to state when it is received in props

  static getDerivedStateFromProps(nextProps, prevState) {
    let questionList, time;
    nextProps.testDetails.map(test => {
      if (test.id === nextProps.curTest.id) {
        questionList = test.questions;
        time = test.duration;
      }
    });

    if (prevState.questions !== questionList) {
      let tempState = {
        ...prevState,
        questions: questionList,
        testName: nextProps.curTest.name,
        testId: nextProps.curTest.id,
        minutes: time,
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

  // dropdown selection handler

  setLanguage = e => {
    let index = e.target.selectedIndex;
    this.setState({ language: `${e.target[index].value}` });
  };

  // get question details

  getDetails = e => {
    this.props.setCode("");
    this.setState({
      highlightedQuestion: e.target.innerText,
      submitted: false
    });
  };

  // get language code to send to api

  getLanguageCode = language => {
    switch (language) {
      case "c_cpp":
        return "c";
      case "python":
        return "python3";
      default:
        return language;
    }
  };

  // run button click handler
  runCode = () => {
    let languageCode = this.getLanguageCode(this.state.language);
    let data = {
      code: this.props.code,
      language: languageCode,
      sampleInput: this.props.curQuestion.sampleInput
    };
    this.props.setAlert("Running code...");
    axios
      .post("/api/run", data)
      .then(res => {
        console.log(res.data.body.output);
        let op = this.props.curQuestion.sampleOutput.replace(/\\n/g, "\n");
        op = op.replace(/\"/g, "");
        if (op === res.data.body.output) {
          this.props.setAlert("Passed!", "/checked.png");
          setTimeout(() => {
            this.props.setAlert("");
          }, 2000);
          this.setState({
            currentScore:
              this.state.currentScore + this.props.curQuestion.points
          });
        } else {
          this.props.setAlert("Failed!", "/error.png");
          setTimeout(() => {
            this.props.setAlert("");
          }, 2000);
        }
      })
      .catch(err => console.log(err));
  };

  // submit button click handler

  submitCode = () => {
    this.runCode();

    //create document if it doesnt exist

    if (!this.state.docId) {
      db.collection("codes")
        .add({
          candidateName: this.props.user,
          testId: this.state.testId,
          score: this.state.currentScore
        })
        .then(docRef => {
          this.setState({ docId: docRef.id });
        });
    } else {
      // update score while preventing double submisssions

      db.collection("codes")
        .doc(this.state.docId)
        .update({ score: this.state.currentScore });
    }
  };

  // finish button click handler

  finishTest = () => {
    this.props.history.push("/dashboard");
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
        {this.props.alert.message ? (
          <Alert
            message={this.props.alert.message}
            icon={this.props.alert.icon}
          />
        ) : null}
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            <p className="flex-item">{testName}</p>
            <Timer
              className="flex-item"
              minutes={this.state.minutes}
              seconds={"00"}
            />
            <p className="flex-item">
              {this.props.user ? this.props.user : null}
            </p>
            <Button className="flex-item" click={this.finishTest}>
              Finish test
            </Button>
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
                <option value="cpp14">C++ 14</option>
                <option value="python">Python</option>
              </select>
              <CodeEditor language={this.state.language} />
              <br />
              <Button click={this.runCode}>Run</Button>
              <Button click={this.submitCode}>Submit</Button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert.alert,
  user: state.auth.userName,
  curTest: state.tests.currentTest,
  questionDetails: state.tests.questionDetails,
  code: state.code.currentCode,
  curQuestion: state.code.curQuestionInfo,
  testDetails: state.tests.testList
});

export default withRouter(
  connect(
    mapStateToProps,
    { setCode, setAlert }
  )(AnswerTest)
);
