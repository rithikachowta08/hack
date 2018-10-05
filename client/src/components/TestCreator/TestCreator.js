import React, { Component, Fragment } from "react";
import { logout } from "../../config/functions";
import Header from "../../layout/Header/Header";
import Button from "../../layout/Button/Button";
import ListItem from "../../layout/ListItem/ListItem";
import "./TestCreator.css";

class TestCreator extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Header logout={logout} />
        <div className="content-wrapper content-overlay">
          <div className="test-header">
            Test name > Active tab
            <Button>Next</Button>
          </div>
          <div className="overlay">
            <div className="navigator">
              <ul>
                <li>Library</li>
                <li>Custom questions</li>
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
                </div>
              </ListItem>
              <ListItem>
                <h3>Graph coloring</h3>
                <div className="details">
                  <span>Graphs</span>
                  <span>Points: 20</span>
                  <span>Difficulty: Easy</span>
                </div>
              </ListItem>
              <ListItem>
                <h3>Subsegment sum </h3>
                <div className="details">
                  <span>Arrays</span>
                  <span>Points: 30</span>
                  <span>Difficulty: Medium</span>
                </div>
              </ListItem>
              <ListItem>
                <h3>K perfect matchings</h3>
                <div className="details">
                  <span>Algorithm design</span>
                  <span>Points: 40</span>
                  <span>Difficulty: Hard</span>
                </div>
              </ListItem>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TestCreator;
