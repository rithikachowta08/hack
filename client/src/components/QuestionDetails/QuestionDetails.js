import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setCurQuestion } from "../../actions/codeActions";
import { withRouter } from "react-router-dom";
import "./QuestionDetails.css";

class QuestionDetails extends Component {
  state = { curQuestion: "", curQuestionInfo: null };

  // update details of current question to state

  static getDerivedStateFromProps(nextProps, prevState) {
    var questionInfo;
    nextProps.questionDetails.map(question => {
      if (question.name === nextProps.qname) {
        questionInfo = question;
      }
    });
    if (nextProps.qname !== prevState.curQuestion) {
      nextProps.setCurQuestion(questionInfo);
      return {
        ...prevState,
        curQuestion: nextProps.qname,
        curQuestionInfo: questionInfo
      };
    } else return prevState;
  }

  render() {
    let details = this.state.curQuestionInfo ? (
      <div className="info">
        <h2>{this.state.curQuestionInfo.name}</h2>
        <div className="subheading">
          <div>{this.state.curQuestionInfo.category}</div>
          <div>Difficulty: {this.state.curQuestionInfo.difficulty}</div>
          <div>{this.state.curQuestionInfo.points} points</div>
        </div>

        <div className="quesDetails">
          {this.state.curQuestionInfo.description}
        </div>

        <h5>Input:</h5>
        <div className="input">{this.state.curQuestionInfo.input}</div>

        <h5>Output:</h5>

        <div className="output">{this.state.curQuestionInfo.output}</div>

        <h5>Sample input:</h5>
        <div className="sampleInput">
          {this.state.curQuestionInfo.sampleInput
            .replace(/\"/g, "")
            .split("\\n")
            .map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
        </div>
        <h5>Sample output:</h5>
        <div className="sampleOutput">
          {this.state.curQuestionInfo.sampleOutput
            .replace(/\"/g, "")
            .split("\\n")
            .map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
        </div>
      </div>
    ) : null;

    return <Fragment>{details}</Fragment>;
  }
}

const mapStateToProps = state => ({
  curTest: state.tests.currentTest,
  questionDetails: state.tests.questionDetails,
  testDetails: state.tests.testList
});

export default withRouter(
  connect(
    mapStateToProps,
    { setCurQuestion }
  )(QuestionDetails)
);
