import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurCandidate } from "../../actions/codeActions";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import Button from "../../layout/Button/Button";
import Input from "../../layout/Input/Input";

class CandidateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  // handle input field change

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // submit current candidate details and intialize test

  submitDetails = () => {
    this.props.setCurCandidate(this.state.name, this.state.email);
    this.props.history.push("/test/answer");
  };

  render() {
    return (
      <div className="modal" style={{ top: "40%", zIndex: "1" }}>
        <div className="wrapper">
          <h2>
            Enter details
            <i
              className="fa fa-times-circle"
              onClick={() => this.props.closeFunc("displayAnswerModal")}
            />
          </h2>
          <Input
            value={this.state.name}
            change={this.handleChange}
            name="name"
            placeholder="Name"
          />

          <Input
            value={this.state.email}
            change={this.handleChange}
            name="email"
            placeholder="Email"
          />

          <Button click={this.submitDetails}>Submit</Button>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({});

export default withRouter(
  connect(
    null,
    { setCurCandidate }
  )(CandidateDetails)
);
