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
    this.state = { addedQuestions: [], libraryQuestions: [] };
    this.selectedQuestions = [];
  }

  // update list of selected questions

  addQuestion = (qname, qid) => {
    this.selectedQuestions.push({ qname, qid });
    this.setState({ addedQuestions: this.selectedQuestions });
  };

  // update db and dispatch action to update store

  publishTest = () => {
    let arr = this.selectedQuestions.map(item => item.qid);
    db.collection("tests")
      .doc("GpTTiOf0S3pj2H9i2u9i")
      .update({
        questions: arr
      });
    this.props.addQuestions(arr);
  };

  // display list of questions available in database

  componentDidMount() {
    let questions = [];
    db.collection("questions")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          questions.push({
            id: doc.id,
            name: data.name,
            category: data.category,
            difficulty: data.difficulty,
            points: data.points,
            descriptions: data.description
          });
        });
        this.setState({ libraryQuestions: questions });
      });
  }

  render() {
    let previewList = this.state.addedQuestions.map((item, index) => (
      <ListItem key={index}>{item.qname}</ListItem>
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
            onClick={this.addQuestion.bind(this, item.name, item.id)}
          />
        </div>
      </ListItem>
    ));

    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            <p>{this.props.testName}</p>
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
  testList: state.tests.testList
});

export default withRouter(
  connect(
    mapStateToProps,
    { addQuestions }
  )(TestCreator)
);
