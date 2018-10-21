import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import "./AdminDashboard.css";
import { db } from "../../config/fire";
import "firebase/firestore";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import {
  fetchTests,
  setCurTest,
  fetchQuestionDetails
} from "../../actions/testActions";
import Button from "../../layout/Button/Button";
import AdminElement from "../../layout/AdminElement";
import PublicElement from "../../layout/PublicElement";
import { logout } from "../../config/functions";
import Spinner from "../../layout/Spinner/Spinner";
import CreateTestModal from "../../components/CreateTestModal/CreateTestModal";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: null,
      userid: false,
      displayCreateModal: false,
      redirect: false
    };
  }

  // create new test button click handler -- admin access

  displayModal = modalName => {
    this.setState({
      [modalName]: true
    });
  };

  // answer button click handler -- candidate access

  answerTest = e => {
    this.props.setCurTest(e.target.id, e.target.name);
    this.props.history.push("/test/answer");
  };

  // create modal close button click handler

  removeModal = modalName => {
    this.setState({
      [modalName]: false
    });
  };

  // view scores button click handler -- admin access

  viewScores = testId => {
    this.setState({ redirect: true, testId });
  };

  // update state with test details from database

  componentDidMount() {
    this.props.fetchTests();
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
            description: data.description,
            input: data.input,
            output: data.output,
            sampleInput: data.sampleInput,
            sampleOutput: data.sampleOutput,
            sampleInput2: data.sampleInput2,
            sampleOutput2: data.sampleOutput2,
            sampleInput3: data.sampleInput3,
            sampleOutput3: data.sampleOutput3
          });
        });
        this.props.fetchQuestionDetails(questions);
      });
  }

  // update list of tests in db to state when it is received in props

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.testList !== prevState.testList) {
      return { tests: nextProps.testList, userid: nextProps.userid };
    } else return null;
  }

  // render modal when displayCreateModal flag true and render spinner while getting test details

  render() {
    let testItems;
    if (this.state.tests === "nodata") {
      testItems = <p>Nothing to show!</p>;
    } else if (this.state.tests.length !== 0) {
      testItems = (
        <table className="table-header">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Date created</th>
              <th>Profile</th>
              <th>Actions</th>
            </tr>
            {this.state.tests.map(test => (
              <tr key={`${test.id}`}>
                <td>{test.name}</td>
                <td>{test.date}</td>
                <td>{test.profile}</td>
                <td>
                  <PublicElement userId={this.state.userid}>
                    <Button
                      name={test.name}
                      id={test.id}
                      style={{ marginRight: "0px" }}
                      click={this.answerTest}
                    >
                      Answer
                    </Button>
                  </PublicElement>
                  <AdminElement userId={this.state.userid}>
                    <Button
                      style={{ marginRight: "0px" }}
                      name={test.name}
                      id={test.id}
                      click={this.viewScores.bind(this, test.id)}
                    >
                      View scores
                    </Button>
                  </AdminElement>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      testItems = <Spinner />;
    }
    return (
      <Fragment>
        {this.state.displayCreateModal ? (
          <CreateTestModal closeFunc={this.removeModal} />
        ) : null}
        <Header logout={logout} />
        <div className="content-wrapper">
          <h2>Tests</h2>
          {testItems}
          <AdminElement userId={this.state.userid}>
            <Button
              title="Create test"
              class="float"
              click={this.displayModal.bind(this, "displayCreateModal")}
            >
              +
            </Button>
          </AdminElement>
        </div>
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: "/test/scores",
              testId: this.state.testId
            }}
          />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  testList: state.tests.testList,
  userid: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchTests, setCurTest, fetchQuestionDetails }
  )(AdminDashboard)
);
