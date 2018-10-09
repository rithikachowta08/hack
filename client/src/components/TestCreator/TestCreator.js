import React, { Component, Fragment } from "react";
import { logout } from "../../config/functions";
import ReactDOM from "react-dom";
import Header from "../../layout/Header/Header";
import Button from "../../layout/Button/Button";
import Spinner from "../../layout/Spinner/Spinner";
import ListItem from "../../layout/ListItem/ListItem";
import axios from "axios";
import fire, { db } from "../../config/fire";
import "firebase/firestore";
import "./TestCreator.css";

class TestCreator extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { addedQuestions: [], libraryQuestions: [] };
    this.selectedQuestions = [];
  }

  addQuestion = q => {
    this.selectedQuestions.push(q);
    this.setState({ addedQuestions: this.selectedQuestions });
  };

  componentDidMount() {
    let questions = [];
    db.collection("questions")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          questions.push({
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
      <ListItem key={index}>{item}</ListItem>
    ));
    let questionItems = this.state.libraryQuestions.map((item, index) => (
      <ListItem key={index}>
        <h3>{item.name}</h3>
        <div className="details">
          <span>{item.category}</span>
          <span>Points: {item.points}</span>
          <span>Difficulty: {item.difficulty}</span>
          <i
            className="fa fa-plus-circle"
            onClick={this.addQuestion.bind(this, item.name)}
          />
        </div>
      </ListItem>
    ));

    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            {this.props.testName}
            <Button>Publish</Button>
          </div>
          <div className="overlay">
            <div className="navigator">
              <ul>
                <li>Library</li>
                <li>My questions</li>
              </ul>
            </div>
            <div className="list-view">{questionItems}</div>
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

export default TestCreator;
