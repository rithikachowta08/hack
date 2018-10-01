import React, { Component, Link } from "react";
import Button from "../../layout/Button/Button";
import "./CreateTestModal.css";
import Input from "../../layout/Input/Input";
import { Route } from "react-router-dom";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

class CreateTestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="modal big-modal">
        <div className="wrapper">
          <h2>
            Create Test
            <img
              src="https://cdn1.iconfinder.com/data/icons/customicondesign-mini-lightcolour-png/48/Close.png"
              alt="close-btn"
              onClick={() => this.props.closeFunc("displayCreateModal")}
            />
          </h2>
          <Input
            value={this.state.name}
            change={this.handleChange}
            name="name"
            placeholder="Test name"
          />

          <Input
            value={this.state.jobProfile}
            change={this.handleChange}
            name="jobProfile"
            placeholder="Job profile"
          />

          <Input
            value={this.state.duration}
            change={this.handleChange}
            name="Duration"
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
          {/* <Link to="/dashboard"> */}
          <Button click={this.login}>Create</Button>
          {/* </Link> */}
          <Route path="/dashboard" exact Component={AdminDashboard} />
        </div>
      </div>
    );
  }
}

export default CreateTestModal;
