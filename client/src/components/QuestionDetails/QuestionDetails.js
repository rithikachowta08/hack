import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./QuestionDetails.css";

class QuestionDetails extends Component {
  state = { curQuestion: "", curQuestionInfo: {} };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.qname !== prevState.curQuestion) {
      let questionInfo;
      nextProps.questions.map((question, index) => {
        if (question.name == nextProps.qname) {
          questionInfo = nextProps.questions[index];
        }
      });

      console.log(questionInfo);
      return {
        ...prevState,
        questionDetails: nextProps.questions,
        curQuestion: nextProps.qname,
        curQuestionInfo: questionInfo
      };
    } else return prevState;
  }

  render() {
    let questionInfo = this.state.curQuestionInfo
      ? this.state.curQuestionInfo
      : "";
    let details =
      this.state.questionInfo !== {} ? (
        <div className="info">
          <h2>{questionInfo.name}</h2>
          <div className="subheading">
            <div>{questionInfo.category}</div>
            <div>{questionInfo.difficulty}</div>
            <div>{questionInfo.points} points</div>
          </div>

          <div className="quesDetails">{questionInfo.description}</div>

          <h5>Input:</h5>
          <div className="input">{questionInfo.input}</div>

          <h5>Output:</h5>

          <div className="output">{questionInfo.output}</div>

          <h5>Sample input:</h5>
          <div className="sampleInput">{questionInfo.sampleInput}</div>
          <h5>Sample output:</h5>
          <div className="sampleOutput">{questionInfo.sampleOutput}</div>
        </div>
      ) : null;

    return <Fragment>{details}</Fragment>;
  }
}

const mapStateToProps = state => ({
  questions: state.tests.testQuestions
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(QuestionDetails)
);
