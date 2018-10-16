import React, { Component, Fragment } from "react";
import { logout } from "../../config/functions";
import Header from "../../layout/Header/Header";
import Button from "../../layout/Button/Button";
import Spinner from "../../layout/Spinner/Spinner";
import ListItem from "../../layout/ListItem/ListItem";
import { db } from "../../config/fire";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addQuestions } from "../../actions/testActions";
import "firebase/firestore";
import "./TestCreator.css";

class TestCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      addedQuestions: [],
      libraryQuestions: [],
      activeTest: null
    };
    this.selectedQuestions = [];
  }

  // update list of selected questions

  addQuestion = (name, id, pts) => {
    this.selectedQuestions.push({ name, id });
    this.setState({
      addedQuestions: this.selectedQuestions,
      points: this.state.points + pts
    });
  };

  // update db and dispatch action to update store

  publishTest = () => {
    db.collection("tests")
      .doc(this.state.activeTest.id)
      .update({
        totalPoints: this.state.points,
        questions: this.state.addedQuestions,
      });
    this.props.addQuestions(this.state.addedQuestions);
    this.props.history.push("/dashboard");
  };

  // get details of all questions available in database and add to store

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.questionInfo !== prevState.questionInfo)
      return {
        libraryQuestions: nextProps.questionInfo,
        activeTest: nextProps.curTest
      };
  }

  render() {
    let testName = this.state.activeTest ? this.state.activeTest.name : null;
    let previewList = this.state.addedQuestions.map((item, index) => (
      <ListItem key={index}>{item.name}</ListItem>
    ));

    let questionItems = this.state.libraryQuestions.map((item, index) => (
      <ListItem key={item.id}>
        <h3>{item.name}</h3>
        <div className="details">
          <span>{item.category}</span>
          <span>Points: {item.points}</span>
          <span>Difficulty: {item.difficulty}</span>
          <i
            className="fa fa-plus-circle"
            onClick={this.addQuestion.bind(
              this,
              item.name,
              item.id,
              item.points
            )}
          />
        </div>
      </ListItem>
    ));

    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            <p>{testName}</p>
            <Button click={this.publishTest}>Publish</Button>
          </div>
          <div className="overlay">
            <div className="navigator">
              <ul>
                <li>Library</li>
                <li>My questions</li>
              </ul>
            </div>
            <div className="list-view">
              {questionItems.length !== 0 ? questionItems : <Spinner />}
            </div>
            <div className="test-preview">
              <p>Preview</p>
              {previewList}
              <h5>Total points: {this.state.points}</h5>
            </div>
            {/* <div className="send-invites">
              <h2>Send invites to candidates</h2>
              <textarea
                name="emails"
                id="emails"
                cols="30"
                rows="10"
                ref="mailingList"
                placeholder="Emails IDs"
              />
              <Button click={this.sendMail}>Send</Button>
            </div> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  curTest: state.tests.newTest,
  questionInfo: state.tests.questionDetails
});

export default withRouter(
  connect(
    mapStateToProps,
    { addQuestions }
  )(TestCreator)
);
