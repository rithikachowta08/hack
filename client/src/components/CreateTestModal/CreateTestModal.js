import React, { Component } from "react";
import "./CreateTestModal.css";
import { db } from "../../config/fire";
import "firebase/firestore";
import Input from "../../layout/Input/Input";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addNewTest } from "../../actions/testActions";

class CreateTestModal extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", profile: "", duration: "", questionCount: "" };
  }

  // handle input field change
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // redirect to editor
  submitForm = e => {
    e.preventDefault();
    let details = {};
    let today = new Date();
    today =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    for (let i = 0; i < 5; i++) {
      details[e.target[i].name] = e.target[i].value;
    }
    db.collection("tests")
      .add({ ...details, status: "draft", date: today })
      .then(docRef => {
        details.docID = docRef.id;
        this.props.addNewTest(details.name, details.docID);
      });
    this.props.history.push("/test/edit");
  };

  // render create test modal
  render() {
    return (
      <div className="modal big-modal">
        <div className="wrapper">
          <h2>
            Create Test
            <i
              className="fa fa-times-circle"
              onClick={() => this.props.closeFunc("displayCreateModal")}
            />
          </h2>
          <form onSubmit={this.submitForm}>
            <Input
              value={this.state.name}
              change={this.handleChange}
              name="name"
              placeholder="Test name"
            />

            <Input
              value={this.state.profile}
              change={this.handleChange}
              name="profile"
              placeholder="Job profile"
            />

            <Input
              value={this.state.duration}
              change={this.handleChange}
              name="duration"
              placeholder="Duration (mins)"
            />

            <Input
              value={this.state.questionCount}
              change={this.handleChange}
              name="questionCount"
              placeholder="No. of questions"
            />

            <p>Experience: </p>
            <select name="experience">
              <option value="fresher">Fresher</option>
              <option value="1to2">1-2 yrs experience</option>
              <option value="3to5">3-5 yrs experience</option>
              <option value="5to10">5-10 yrs experience</option>
              <option value="10plus">>10 yrs experience</option>
            </select>
            <br />
            <input type="submit" name="submit" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testList: state.tests.testList
});

export default withRouter(
  connect(
    mapStateToProps,
    { addNewTest }
  )(CreateTestModal)
);
