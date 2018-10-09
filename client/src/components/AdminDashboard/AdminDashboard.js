import React, { Component, Fragment } from "react";
import Header from "../../layout/Header/Header";
import "./AdminDashboard.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchTests } from "../../actions/testActions";
import Button from "../../layout/Button/Button";
import { logout } from "../../config/functions";
import Spinner from "../../layout/Spinner/Spinner";
import CreateTestModal from "../../components/CreateTestModal/CreateTestModal";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: null,
      displayCreateModal: false
    };
  }

  // create new test button click handler

  displayModal = modalName => {
    this.setState({
      [modalName]: true
    });
  };

  // modal close button click handler

  removeModal = modalName => {
    this.setState({
      [modalName]: false
    });
  };

  // update state with test details from database

  componentDidMount() {
    this.props.fetchTests();
  }

  // update tests to ui when it is received in props

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.testList !== prevState.testList) {
      return { tests: nextProps.testList };
    } else return null;
  }

  // render modal when displayCreateModal flag true and render spinner while getting test details

  render() {
    let testItems =
      this.state.tests.length !== 0 ? (
        <table className="table-header">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Date created</th>
              <th>Profile</th>
              <th>Status</th>
            </tr>
            {this.state.tests.map((test, index) => (
              <tr key={`test${index}`}>
                <td>{test.name}</td>
                <td>{test.date}</td>
                <td>{test.profile}</td>
                <td>{test.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      );

    return (
      <Fragment>
        {this.state.displayCreateModal ? (
          <CreateTestModal closeFunc={this.removeModal} />
        ) : null}
        <Header logout={logout} />
        <div className="content-wrapper">
          <h2>Tests</h2>
          {testItems}
          <Button
            title="Create test"
            class="float"
            click={this.displayModal.bind(this, "displayCreateModal")}
          >
            +
          </Button>
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
    { fetchTests }
  )(AdminDashboard)
);
