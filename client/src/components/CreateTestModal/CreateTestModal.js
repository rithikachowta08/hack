import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "../../layout/Button/Button";
import "./CreateTestModal.css";
import Input from "../../layout/Input/Input";

class CreateTestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handle input field change
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // redirect to editor
  redirect = () => {
    window.location.assign("/test/name/edit");
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
          <Button click={this.redirect}>Create</Button>
        </div>
      </div>
    );
  }
}

export default CreateTestModal;
