import React, { Component, Fragment } from "react";
import { logout } from "../../config/functions";
import ReactDOM from "react-dom";
import Header from "../../layout/Header/Header";
import Button from "../../layout/Button/Button";
import ListItem from "../../layout/ListItem/ListItem";
import axios from "axios";
import "./TestCreator.css";

class TestCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { addedQuestions: [], mailingList: [] };
    this.selectedQuestions = [];
  }

  addQuestion = q => {
    this.selectedQuestions.push(q);
    this.setState({ addedQuestions: this.selectedQuestions });
  };

  render() {
    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            Test name > Active tab
            <Button>Publish</Button>
          </div>
          <div className="overlay">
            <div className="navigator">
              <ul>
                <li>Library</li>
                <li>My questions</li>
              </ul>
            </div>
            <div className="list-view">
              <ListItem>
                <h3>Safe Partition</h3>
                <div className="details">
                  <span>Linked Lists</span>
                  <span>Points: 20</span>
                  <span>Difficulty: Medium</span>
                  <i
                    className="fa fa-plus-circle"
                    onClick={this.addQuestion.bind(this, "Safe partition")}
                  />
                </div>
              </ListItem>
              <ListItem>
                <h3>Graph coloring</h3>
                <div className="details">
                  <span>Graphs</span>
                  <span>Points: 20</span>
                  <span>Difficulty: Easy</span>
                  <i
                    className="fa fa-plus-circle"
                    onClick={this.addQuestion.bind(this, "Graph coloring")}
                  />
                </div>
              </ListItem>
              <ListItem>
                <h3>Subsegment sum </h3>
                <div className="details">
                  <span>Arrays</span>
                  <span>Points: 30</span>
                  <span>Difficulty: Medium</span>
                  <i
                    className="fa fa-plus-circle"
                    onClick={this.addQuestion.bind(this, "Subsegment sum")}
                  />
                </div>
              </ListItem>
              <ListItem>
                <h3>K perfect matchings</h3>
                <div className="details">
                  <span>Algorithm design</span>
                  <span>Points: 40</span>
                  <span>Difficulty: Hard</span>
                  <i
                    className="fa fa-plus-circle"
                    onClick={this.addQuestion.bind(this, "K perfect matchings")}
                  />
                </div>
              </ListItem>
            </div>
            <div className="test-preview">
              <p>Preview</p>
              {this.state.addedQuestions.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
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
